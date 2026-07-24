import Order from "../model/order.model.js";
import Shop from "../model/shop.model.js";
import Product from "../model/product.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import mongoose from "mongoose";

// =============================================
//  CREATE ORDER
// =============================================
export const createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, totalPrice, paymentInfo } = req.body;

    // console.log(`req.user: ${req.user}`);
    const secureUser = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber || "",
      // avatar: req.user.avatar, // if want to add
    };

    // Cart empty toh nahi?
    if (!cart || cart.length === 0) {
      return next(new ErrorHandler("Cart is empty!", 400));
    }

    // Group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopId) {
        return next(new ErrorHandler("Each cart item must have a shopId", 400));
      }
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // Create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      // Is shop ke items ka apna subtotal
      const shopSubtotal = items.reduce(
        (acc, item) =>
          acc +
          (item.discountPrice || item.originalPrice || 0) * (item.qty || 1),
        0,
      );
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user: secureUser,
        totalPrice: shopSubtotal, // per-shop total
        paymentInfo: paymentInfo || { type: "Cash On Delivery" },
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
      message: `Order placed successfully! ${orders.length} order(s) created.`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  GET ALL ORDERS OF USER
// =============================================

export const getAllUserOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  GET ALL ORDERS OF SELLER (SHOP)
// =============================================
export const getAllSellerOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({
      "cart.shopId": req.params.shopId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  UPDATE ORDER STATUS (SELLER)
// =============================================
export const updateStatusOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }

    if (req.body.status === "Transferred to delivery partner") {
      for (const o of order.cart) {
        await updateProductStock(o._id, o.qty);
      }
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.1;
      await updateSellerBalance(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    // Helper Functions
    async function updateProductStock(productId, qty) {
      const product = await Product.findById(productId);
      if (product) {
        product.stock -= qty;
        product.sold_out += qty;
        await product.save({ validateBeforeSave: false });
      }
    }

    async function updateSellerBalance(amount) {
      const seller = await Shop.findById(req.seller.id);
      if (seller) {
        seller.availableBalance = (seller.availableBalance || 0) + amount;
        await seller.save();
      }
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  ORDER REFUND (USER)
// =============================================
export const orderRefund = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
      message: "Order Refund Request successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  ORDER REFUND SUCCESS (SELLER)
// =============================================
export const orderRefundSuccess = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }

    if (order.status === "Refund Success") {
      return next(new ErrorHandler("Refund already processed!", 400));
    }

    order.status = req.body.status;
    await order.save();

    if (req.body.status === "Refund Success") {
      for (const o of order.cart) {
        await updateProductStockOnRefund(o._id, o.qty);
      }
      /* Every order belongs to a single shop only (createOrder splits multi-shop carts into separate orders per shop at checkout time),so taking the shopId from the first cart item is safe here.*/
      const shopId = order.cart[0]?.shopId;
      if (shopId) {
        const seller = await Shop.findById(shopId);
        if (seller) {
          /* Seller only received 90% at delivery time (10% was admin's commission), so refund only deducts that same 90% share back.*/
          const refundAmount = order.totalPrice * 0.9;
          seller.availableBalance =
            (seller.availableBalance || 0) - refundAmount;
          await seller.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Order Refund successful!",
    });

    async function updateProductStockOnRefund(productId, qty) {
      const product = await Product.findById(productId);
      if (product) {
        product.stock += qty;
        product.sold_out -= qty;
        await product.save({ validateBeforeSave: false });
      }
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// GET ALL ORDERS (Admin Only)
// =============================================
export const getAllAdminOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find().sort({
      deliveredAt: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

import express from "express";
import Shop from "../model/shop.model.js";
import CouponCode from "../model/couponCode.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// =============================================
// create coupoun code
// =============================================
export const createCouponCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const isCouponCodeExists = await CouponCode.findOne({
      name: req.body.name,
    });

    if (isCouponCodeExists) {
      return next(new ErrorHandler("Coupoun code already exists!", 400));
    }

    const couponCode = await CouponCode.create(req.body);

    res.status(201).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
// =============================================
// get all coupons of a shop
// =============================================
export const getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCodes = await CouponCode.find({ shopId: req.seller.id });
    res.status(200).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// =============================================
// delete coupoun code of a shop
// =============================================

export const deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code dosen't exists!", 404));
    }
    res.status(200).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// =============================================
// get coupon code value by its name
// =============================================

export const getCouponCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode: couponCode || null,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to fetch coupon", 400));
  }
});

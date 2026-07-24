import express from "express";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import Shop from "../model/shop.model.js";
import Product from "../model/product.model.js";
import upload from "../multer.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";
import path from "path";

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//  create shop account
export const createShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, name, password, address, phoneNumber, zipCode } = req.body;
    const parsedPhoneNumber = Number(phoneNumber);
    const parsedZipCode = Number(zipCode);

    // Validate required fields
    if (
      !email ||
      !name ||
      !password ||
      !address ||
      !parsedPhoneNumber ||
      !parsedZipCode
    ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
      return next(new ErrorHandler("Shop already exists", 400));
    }

    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;

    const seller = {
      name,
      email,
      password,
      avatar: {
        public_id: filename,
        url: filePath,
      },
      address: address,
      phoneNumber: parsedPhoneNumber,
      zipCode: parsedZipCode,
    };

    const activationToken = createActivationToken(seller);
    // shop.js controller mein
    const activationUrl = `http://localhost:5173/activation/${activationToken}?type=seller`;

    await sendMail({
      email: seller.email,
      subject: "Activate your Shop",
      message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:- ${seller.email} to activate your shop!`,
    });
  } catch (error) {
    // console.error("createShop Error:", error.message);
    return next(new ErrorHandler(error.message, 500));
  }
});

// shop activation
export const sellerActivation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    if (!activation_token) {
      return next(new ErrorHandler("Activation token missing", 400));
    }

    const newSeller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET,
    );
    // console.log("🔍 Decoded Seller:", newSeller); // 👈 Debugging
    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      newSeller;

    // 🔥 Convert to Number (agar string aayi toh)
    const parsedPhoneNumber = Number(phoneNumber);
    const parsedZipCode = Number(zipCode);

    // Validate
    if (!address || !parsedPhoneNumber || !parsedZipCode) {
      return next(
        new ErrorHandler(
          "Missing required fields: address, phoneNumber, or zipCode",
          400,
        ),
      );
    }
    const existingSeller = await Shop.findOne({ email });

    if (existingSeller) {
      return next(new ErrorHandler("Seller already exists", 400));
    }

    const seller = await Shop.create({
      name,
      email,
      avatar,
      password,
      zipCode: parsedZipCode,
      address,
      phoneNumber: parsedPhoneNumber,
    });

    sendToken(seller, 201, res, { cookieName: "seller_token" });
  } catch (error) {
    // console.error("🔥 sellerActivation Error:", error.message);
    return next(new ErrorHandler(error.message, 500));
  }
});

// seller/shop account Login
export const loginShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const seller = await Shop.findOne({ email }).select("+password");

    if (!seller) {
      return next(new ErrorHandler("Shop doesn't exists!", 400));
    }

    const isPasswordValid = await seller.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400),
      );
    }

    sendToken(seller, 201, res, { cookieName: "seller_token", rememberMe });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//load shop
export const loadShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellerShop = await Shop.findById(req.seller.id);
    // console.log(sellerShop);

    if (!sellerShop) {
      return next(new ErrorHandler("Shop doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      seller: sellerShop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// log out user
export const logoutShop = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      // while at production
      // sameSite: "none",
      // secure: true,

      // while at development
      sameSite: "lax",
      secure: process.env.NODE_ENV === "PRODUCTION",
    });
    res.status(200).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get shop info
export const getShopInfo = catchAsyncErrors(async (req, res, next) => {
  // console.log("IDDD: ", req.params.id);
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// UPDATE SHOP AVATAR
// =============================================
export const updateShopAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller.id);

    if (!seller) {
      return next(new ErrorHandler("Shop not found", 404));
    }

    // Delete old avatar if exists (local storage)
    if (seller.avatar?.url) {
      const oldPath = path.join(process.cwd(), seller.avatar.url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Set new avatar
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;

    seller.avatar = {
      public_id: filename,
      url: filePath,
    };

    await seller.save();

    // for updating content
    await Product.updateMany(
      { shopId: seller._id.toString() },
      { $set: { shop: seller } },
    );

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// UPDATE SHOP INFO
// =============================================
export const updateShopInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;

    const seller = await Shop.findById(req.seller.id);

    if (!seller) {
      return next(new ErrorHandler("Shop not found", 404));
    }

    seller.name = name || seller.name;
    seller.description = description || seller.description;
    seller.address = address || seller.address;
    seller.phoneNumber = phoneNumber || seller.phoneNumber;
    seller.zipCode = zipCode || seller.zipCode;

    await seller.save();
    await Product.updateMany(
      { shopId: seller._id.toString() },
      { $set: { shop: seller } },
    );

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// GET ALL SELLERS (ADMIN ONLY)
// =============================================
export const getAllSellers = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await Shop.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// DELETE SELLER (ADMIN ONLY)
// =============================================
export const deleteSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.params.id);
    if (!seller) {
      return next(new ErrorHandler("Seller not found with this id", 404));
    }

    // Delete seller avatar from local storage
    if (seller.avatar?.url) {
      const oldPath = path.join(process.cwd(), seller.avatar.url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await Shop.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Seller deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// UPDATE PAYMENT METHODS (SELLER ONLY)
// =============================================
export const updatePaymentMethods = catchAsyncErrors(async (req, res, next) => {
  try {
    const { withdrawMethod } = req.body;

    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("Shop not found", 404));
    }

    seller.withdrawMethod = withdrawMethod;
    await seller.save();

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// DELETE WITHDRAW METHOD (SELLER ONLY)
// =============================================
export const deleteWithdrawMethod = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("Shop not found", 404));
    }

    seller.withdrawMethod = null;
    await seller.save();

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// FORGOT PASSWORD - Shop Seller
// =============================================
export const forgotShopPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Please provide your email", 400));
    }

    const shop = await Shop.findOne({ email });

    if (!shop) {
      return res.status(200).json({
        success: true,
        message: "If that email is registered, a reset link has been sent!",
      });
    }

    const resetToken = jwt.sign({ id: shop._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });

    shop.resetPasswordToken = resetToken;
    shop.resetPasswordTime = Date.now() + 5 * 60 * 1000;
    await shop.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendMail({
      email: shop.email,
      subject: "Password Reset Request - Shop",
      message: `Hello ${shop.name}, click the link below to reset your shop password. This link will expire in 5 minutes.\n\n${resetUrl}`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// RESET PASSWORD - Shop Seller
// =============================================
export const resetShopPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return next(new ErrorHandler("Please provide both password fields", 400));
    }

    if (password !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    if (password.length < 6) {
      return next(
        new ErrorHandler("Password must be at least 6 characters", 400),
      );
    }

    const shop = await Shop.findOne({
      resetPasswordToken: token,
      resetPasswordTime: { $gt: Date.now() },
    });

    if (!shop) {
      return next(
        new ErrorHandler("Reset link is invalid or has expired", 400),
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      shop.resetPasswordToken = null;
      shop.resetPasswordTime = null;
      await shop.save();
      return next(
        new ErrorHandler("Reset link is invalid or has expired", 400),
      );
    }

    if (decoded.id !== shop._id.toString()) {
      return next(new ErrorHandler("Invalid reset link", 400));
    }

    shop.password = password;
    shop.resetPasswordToken = null;
    shop.resetPasswordTime = null;

    await shop.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// GOOGLE LOGIN — Shop Seller (Only Existing)
// =============================================

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleShopLogin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return next(new ErrorHandler("Google credential is missing", 400));
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;

    const seller = await Shop.findOne({ email });

    if (!seller) {
      return next(
        new ErrorHandler(
          "No shop found with this email. Please sign up first.",
          404,
        ),
      );
    }

    sendToken(seller, 200, res, {
      cookieName: "seller_token",
      rememberMe: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

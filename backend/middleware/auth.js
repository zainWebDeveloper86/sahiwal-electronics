import Shop from "../model/shop.model.js";
import User from "../model/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

// for normal user
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

// for seller/shop user
export const isSellerAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const { seller_token } = req.cookies; // seller_token

    if (!seller_token) {
      return next(new ErrorHandler("Please login as seller to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.seller = await Shop.findById(decoded.id);

    next();
  },
);

// for communiction/chat in both seller and client
export const isAuthenticatedEither = catchAsyncErrors(
  async (req, res, next) => {
    const { token, seller_token } = req.cookies;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      if (user) {
        req.authId = user._id.toString();
        req.authType = "user";
        return next();
      }
    }

    if (seller_token) {
      const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
      const seller = await Shop.findById(decoded.id);
      if (seller) {
        req.authId = seller._id.toString();
        req.authType = "seller";
        return next();
      }
    }

    return next(new ErrorHandler("Please login to continue", 401));
  },
);

// for Admin
export const isAdmin = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Please login first", 401));
  }

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admin only.", 403));
  }

  next();
});

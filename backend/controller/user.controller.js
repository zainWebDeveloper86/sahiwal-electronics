import express from "express";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import User from "../model/user.model.js";
import upload from "../multer.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";
import path from "path";

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// user account creation
export const createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      // delete all images from Cloudinary
      await cloudinary.uploader.destroy(req.file.filename);
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const filePath = req.file.path;

    const user = {
      name,
      email,
      password,
      avatar: {
        public_id: filename,
        url: filePath,
      },
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.CLIENT_URL}/activation/${activationToken}?type=user`;

    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email, ${user.email} to activate your account`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// user activation
export const userActivation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    if (!activation_token) {
      return next(new ErrorHandler("Activation token missing", 400));
    }

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar } = newUser;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// user account Login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400),
      );
    }

    sendToken(user, 201, res, { rememberMe });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//load user
export const loadUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// log out user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
    res.status(200).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user information
export const updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400),
      );
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user avatar/image
export const updateUserAvator = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const filename = req.file.filename;
    const filePath = req.file.path;

    user.avatar = {
      public_id: filename,
      url: filePath,
    };

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user addresses
export const updateUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) =>
        address.addressType === req.body.addressType &&
        address._id.toString() !== req.body._id, //  Update case mein ignore karo
    );
    if (sameTypeAddress) {
      return next(
        new ErrorHandler(`${req.body.addressType} address already exists`),
      );
    }

    const existsAddress = user.addresses.find(
      (address) => address._id.toString() === req.body._id,
    );

    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      // add the new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete user address
export const deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } },
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user password
export const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password doesn't matched with each other!", 400),
      );
    }
    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// find user information with the userId
export const getUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// GET ALL USERS (ADMIN ONLY)
// =============================================
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// DELETE USER (ADMIN ONLY)
// =============================================
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User not found with this id", 404));
    }

    // Delete user avatar from storage
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// FORGOT PASSWORD - Send reset link via email
// =============================================
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Please provide your email", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Security: Don't reveal if email exists or not
      return res.status(200).json({
        success: true,
        message: "If that email is registered, a reset link has been sent!",
      });
    }

    // Short-lived JWT token — expires in 5 minutes
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });

    // Store hashed token in DB (for single-use verification)
    user.resetPasswordToken = resetToken;
    user.resetPasswordTime = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendMail({
      email: user.email,
      subject: "Password Reset Request",
      message: `Hello ${user.name}, click the link below to reset your password. This link will expire in 5 minutes.\n\n${resetUrl}\n\nIf you didn't request this, please ignore this email.`,
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
// RESET PASSWORD - Verify token & update password
// =============================================
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
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

    // Find user with this token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTime: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      return next(
        new ErrorHandler("Reset link is invalid or has expired", 400),
      );
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      // Token invalid — clear it from DB
      user.resetPasswordToken = null;
      user.resetPasswordTime = null;
      await user.save();
      return next(
        new ErrorHandler("Reset link is invalid or has expired", 400),
      );
    }

    // Ensure token belongs to this user
    if (decoded.id !== user._id.toString()) {
      return next(new ErrorHandler("Invalid reset link", 400));
    }

    // Update password
    user.password = password; // pre-save hook will hash it
    user.resetPasswordToken = null; // ingle-use: token invalidated!
    user.resetPasswordTime = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
// GOOGLE LOGIN — verify Google ID token, login or create user
// =============================================

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { credential } = req.body; // ID token sent from frontend

    if (!credential) {
      return next(new ErrorHandler("Google credential is missing", 400));
    }

    /*Verify the token directly with Google's servers —
    this confirms it's genuine and wasn't tampered with*/
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      /*First-time Google login — create a new account.
      Password is required by the schema, so we generate a random one
      (the user will never need to type it, since they'll always log in via Google).*/
      const randomPassword = crypto.randomBytes(20).toString("hex");

      user = await User.create({
        name,
        email,
        password: randomPassword,
        avatar: {
          public_id: "google-oauth-avatar", // no local file, so a placeholder id
          url: picture,
        },
      });
    }

    /* Reuse the exact same token-issuing + cookie logic as normal login,
    instead of duplicating cookie options here. Google only verifies
    identity — everything after this point follows the app's usual auth flow.*/
    sendToken(user, 200, res, { rememberMe: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

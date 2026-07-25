import express from "express";
import upload from "../multer.js";
import {
  createUser,
  userActivation,
  loginUser,
  loadUser,
  logoutUser,
  updateUserInfo,
  updateUserAvator,
  updateUserAddress,
  deleteUserAddress,
  updateUserPassword,
  getUserInfo,
  getAllUsers,
  deleteUser,
  forgotPassword,
  resetPassword,
  googleLogin,
} from "../controller/user.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", userActivation);
router.post("/login-user", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// public routes - google verify
router.post("/google-login", googleLogin);

// Protected routes (User only)
router.get("/getuser", isAuthenticated, loadUser);
router.get("/logout", isAuthenticated, logoutUser);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.put(
  "/update-user-avatar",
  isAuthenticated,
  upload.single("file"),
  updateUserAvator,
);
router.put("/update-user-addresses", isAuthenticated, updateUserAddress);
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);
router.put("/update-user-password", isAuthenticated, updateUserPassword);
router.get("/user-info/:id", getUserInfo);

// Admin Routes
router.get("/admin-all-users", isAuthenticated, isAdmin, getAllUsers);

router.delete("/delete-user/:id", isAuthenticated, isAdmin, deleteUser);

export default router;

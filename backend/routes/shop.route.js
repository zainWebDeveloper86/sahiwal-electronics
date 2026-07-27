import express from "express";
import upload from "../multer.js";
import {
  createShop,
  sellerActivation,
  loginShop,
  loadShop,
  logoutShop,
  getShopInfo,
  updateShopAvatar,
  updateShopInfo,
  getAllSellers,
  deleteSeller,
  updatePaymentMethods,
  deleteWithdrawMethod,
  forgotShopPassword,
  resetShopPassword,
  googleShopLogin,
} from "../controller/shop.controller.js";
import {
  isSellerAuthenticated,
  isAuthenticated,
  isAdmin,
} from "../middleware/auth.js";

const router = express.Router();

// Public routes (no auth needed)
router.post("/create-shop", upload.single("file"), createShop);
router.post("/activation", sellerActivation);
router.post("/login-shop", loginShop);
router.get("/get-shop-info/:id", getShopInfo);
router.post("/forgot-password", forgotShopPassword);
router.put("/reset-password/:token", resetShopPassword);

// public routes - google verify
router.post("/google-login", googleShopLogin);

// Admin Routes
router.get("/admin-all-sellers", isAuthenticated, isAdmin, getAllSellers);
router.delete("/delete-seller/:id", isAuthenticated, isAdmin, deleteSeller);

// Seller-only routes
router.get("/getSeller", isSellerAuthenticated, loadShop);
router.post("/logout-seller", isSellerAuthenticated, logoutShop);
router.put(
  "/update-shop-avatar",
  isSellerAuthenticated,
  upload.single("file"),
  updateShopAvatar,
);
router.put("/update-seller-info", isSellerAuthenticated, updateShopInfo);

// Seller Withdraw Methods
router.put(
  "/update-payment-methods",
  isSellerAuthenticated,
  updatePaymentMethods,
);
router.delete(
  "/delete-withdraw-method",
  isSellerAuthenticated,
  deleteWithdrawMethod,
);

export default router;

// // // import express from "express";
// // // import upload from "../multer.js";
// // // import {
// // //   createShop,
// // //   sellerActivation,
// // //   loginShop,
// // //   loadShop,
// // //   logoutShop,
// // //   getShopInfo,
// // // } from "../controller/shop.controller.js";
// // // import { isSellerAuthenticated } from "../middleware/auth.js";

// // // const router = express.Router();

// // // router.post("/create-shop", upload.single("file"), createShop);
// // // router.post("/activation", sellerActivation);
// // // router.post("/login-shop", loginShop);
// // // router.get("/getSeller", isSellerAuthenticated, loadShop);
// // // router.get("/logout-seller", isSellerAuthenticated, logoutShop);
// // // router.get("/get-shop-info/:id", getShopInfo);

// // // export default router;

// // import express from "express";
// // import upload from "../multer.js";
// // import {
// //   createShop,
// //   sellerActivation,
// //   loginShop,
// //   loadShop,
// //   logoutShop,
// //   getShopInfo,
// //   updateShopAvatar,
// //   updateShopInfo,
// //   getAllSellers,
// //   deleteSeller,
// // } from "../controller/shop.controller.js";
// // import {
// //   isSellerAuthenticated,
// //   isAuthenticated,
// //   isAdmin,
// // } from "../middleware/auth.js";

// // const router = express.Router();

// // // Public routes
// // router.post("/create-shop", upload.single("file"), createShop);
// // router.post("/activation", sellerActivation);
// // router.post("/login-shop", loginShop);
// // router.get("/get-shop-info/:id", getShopInfo);

// // // Protected routes (Seller only)
// // router.get("/getSeller", isSellerAuthenticated, loadShop);
// // router.get("/logout-seller", isSellerAuthenticated, logoutShop);

// // //  Avatar update
// // router.put(
// //   "/update-shop-avatar",
// //   isSellerAuthenticated,
// //   upload.single("file"),
// //   updateShopAvatar,
// // );

// // //  Shop info update
// // router.put("/update-seller-info", isSellerAuthenticated, updateShopInfo);

// // // Admin Routes
// // router.get("/admin-all-sellers", isAuthenticated, isAdmin, getAllSellers);

// // router.delete("/delete-seller/:id", isAuthenticated, isAdmin, deleteSeller);
// // export default router;

// import express from "express";
// import upload from "../multer.js";
// import {
//   createShop,
//   sellerActivation,
//   loginShop,
//   loadShop,
//   logoutShop,
//   getShopInfo,
//   updateShopAvatar,
//   updateShopInfo,
//   getAllSellers,
//   deleteSeller,
// } from "../controller/shop.controller.js";
// import {
//   isSellerAuthenticated,
//   isAuthenticated,
//   isAdmin,
// } from "../middleware/auth.js";

// const router = express.Router();

// // Public routes (no auth needed)
// router.post("/create-shop", upload.single("file"), createShop);
// router.post("/activation", sellerActivation);
// router.post("/login-shop", loginShop);
// router.get("/get-shop-info/:id", getShopInfo);

// // Admin Routes (must come BEFORE seller-only routes to avoid conflicts)
// router.get("/admin-all-sellers", isAuthenticated, isAdmin, getAllSellers);
// router.delete("/delete-seller/:id", isAuthenticated, isAdmin, deleteSeller);

// // Seller-only routes (protected)
// router.get("/getSeller", isSellerAuthenticated, loadShop);
// router.get("/logout-seller", isSellerAuthenticated, logoutShop);
// router.put(
//   "/update-shop-avatar",
//   isSellerAuthenticated,
//   upload.single("file"),
//   updateShopAvatar
// );
// router.put("/update-seller-info", isSellerAuthenticated, updateShopInfo);

// export default router;

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
router.get("/logout-seller", isSellerAuthenticated, logoutShop);
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

// import express from "express";
// import upload from "../multer.js";
// import {
//   createProduct,
//   getAllShopProducts,
//   deleteProduct,
//   getAllProducts,
//   productReview,
// } from "../controller/product.controller.js";
// import { isSellerAuthenticated,isAuthenticated } from "../middleware/auth.js";

// const router = express.Router();

// router.post(
//   "/create-product",
//   isSellerAuthenticated,
//   upload.array("images"),
//   createProduct,
// );
// router.get(
//   "/get-all-products-shop/:id",
//   isSellerAuthenticated,
//   getAllShopProducts,
// );
// router.delete("/delete-shop-product/:id", isSellerAuthenticated, deleteProduct);
// router.get("/get-all-products", getAllProducts);
// router.put("/create-new-review",isAuthenticated, productReview);

// export default router;

import express from "express";
import upload from "../multer.js";
import {
  createProduct,
  getAllShopProducts,
  deleteProduct,
  getAllProducts,
  productReview,
  getAllAdminProducts, // 👈 Naya import
} from "../controller/product.controller.js";
import {
  isSellerAuthenticated,
  isAuthenticated,
  isAdmin,
} from "../middleware/auth.js";

const router = express.Router();

// Seller routes
router.post(
  "/create-product",
  isSellerAuthenticated,
  upload.array("images"),
  createProduct,
);
router.get(
  "/get-all-products-shop/:id",
  isSellerAuthenticated,
  getAllShopProducts,
);
router.delete("/delete-shop-product/:id", isSellerAuthenticated, deleteProduct);

// Public routes
router.get("/get-all-products", getAllProducts);

// User routes
router.put("/create-new-review", isAuthenticated, productReview);

// Admin route
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin,
  getAllAdminProducts,
);

export default router;

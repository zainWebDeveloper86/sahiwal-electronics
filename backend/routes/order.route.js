import express from "express";
import {
  createOrder,
  getAllSellerOrder,
  getAllUserOrders,
  updateStatusOrder,
  orderRefund,
  orderRefundSuccess,
  getAllAdminOrders,
} from "../controller/order.controller.js";
import {
  isSellerAuthenticated,
  isAuthenticated,
  isAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.get("/get-all-orders/:userId", isAuthenticated, getAllUserOrders);
router.get("/get-seller-all-orders/:shopId", getAllSellerOrder);
router.put(
  "/update-order-status/:id",
  isSellerAuthenticated,
  updateStatusOrder,
);
router.put("/order-refund/:id", isAuthenticated, orderRefund);
router.put(
  "/order-refund-success/:id",
  isSellerAuthenticated,
  orderRefundSuccess,
);

// Admin Route
router.get("/admin-all-orders", isAuthenticated, isAdmin, getAllAdminOrders);

export default router;

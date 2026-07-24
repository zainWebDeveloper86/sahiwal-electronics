import express from "express";
import {
  createWithdrawRequest,
  getAllWithdraws,
  updateWithdrawStatus,
} from "../controller/withdraw.controller.js";
import {
  isSellerAuthenticated,
  isAuthenticated,
  isAdmin,
} from "../middleware/auth.js";

const router = express.Router();

// Seller: Create withdraw request
router.post(
  "/create-withdraw-request",
  isSellerAuthenticated,
  createWithdrawRequest
);

// Admin: Get all withdraw requests
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin,
  getAllWithdraws
);

// Admin: Update withdraw status
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin,
  updateWithdrawStatus
);

export default router;
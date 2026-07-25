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

// Create withdraw request
router.post(
  "/create-withdraw-request",
  isSellerAuthenticated,
  createWithdrawRequest
);

// Get all withdraw requests
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin,
  getAllWithdraws
);

// Update withdraw status
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin,
  updateWithdrawStatus
);

export default router;
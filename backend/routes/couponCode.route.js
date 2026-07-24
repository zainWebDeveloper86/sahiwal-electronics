import express from "express";
import upload from "../multer.js";
import { createCouponCode, deleteCoupon, getAllCoupons,getCouponCode } from "../controller/couponCode.controller.js";
import { isSellerAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-coupon-code", isSellerAuthenticated, createCouponCode);
router.get("/get-all-coupon/:id",isSellerAuthenticated, getAllCoupons);
router.delete("/delete-coupon/:id",isSellerAuthenticated, deleteCoupon);
router.get("/get-coupon-value/:name", getCouponCode);

export default router;
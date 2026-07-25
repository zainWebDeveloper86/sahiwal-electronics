import express from "express";
import upload from "../multer.js";
import {
  createEvent,
  getAllShopEvents,
  getAllEvents,
  deleteEvent,
  getAllAdminEvents, 
} from "../controller/event.controller.js";
import { isSellerAuthenticated, isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Seller routes
router.post(
  "/create-event",
  isSellerAuthenticated,
  upload.array("images"),
  createEvent,
);
router.get("/get-all-events-shop/:id", isSellerAuthenticated, getAllShopEvents);
router.delete("/delete-shop-event/:id", deleteEvent);

// Public routes
router.get("/get-all-events", getAllEvents);

// Admin route
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin,
  getAllAdminEvents,
);

export default router;
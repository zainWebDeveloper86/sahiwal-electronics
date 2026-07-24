import express from "express";
import upload from "../multer.js";
import {
  createMessage,
  getMessages,
} from "../controller/message.controller.js";
import { isAuthenticatedEither } from "../middleware/auth.js";

const router = express.Router();

// Create a new message
router.post(
  "/create-new-message",
  isAuthenticatedEither,
  upload.array("images"),
  createMessage,
);
// Get all messages by conversation ID
router.get("/get-all-messages/:id", isAuthenticatedEither, getMessages);

export default router;

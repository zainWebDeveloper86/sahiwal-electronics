import express from "express";
import {
  createConversation,
  getSellerConversations,
  getUserConversations,
  updateLastMessage,
} from "../controller/conversation.controller.js";
import {
  isSellerAuthenticated,
  isAuthenticated,
  isAuthenticatedEither,
} from "../middleware/auth.js";

const router = express.Router();

//  Create a new conversation
router.post("/create-new-conversation",isAuthenticatedEither ,createConversation);

//  Get seller conversations (requires seller authentication)
router.get(
  "/get-all-conversation-seller/:id",
  isSellerAuthenticated,
  getSellerConversations,
);

//  Get user conversations (requires user authentication)
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  getUserConversations,
);

//  Update last message
router.put("/update-last-message/:id", isAuthenticatedEither,updateLastMessage);

export default router;

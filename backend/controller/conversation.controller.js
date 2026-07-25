import Conversation from "../model/conversation.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// =============================================
//  CREATE A NEW CONVERSATION (buyer-initiated only)
// =============================================
export const createConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    // Only the logged-in user can create a conversation as themself —
    // prevents someone impersonating another buyer via a spoofed userId.
    if (req.authType !== "user" || req.authId !== userId) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    const isConversationExist = await Conversation.findOne({ groupTitle });

    if (isConversationExist) {
      return res.status(200).json({
        success: true,
        conversation: isConversationExist,
      });
    }

    const conversation = await Conversation.create({
      members: [userId, sellerId],
      groupTitle: groupTitle,
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  GET ALL CONVERSATIONS FOR SELLER
// =============================================
export const getSellerConversations = catchAsyncErrors(async (req, res, next) => {
  try {
    // Sellers can only ever fetch their own conversation list
    if (req.params.id !== req.seller._id.toString()) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  GET ALL CONVERSATIONS FOR USER
// =============================================
export const getUserConversations = catchAsyncErrors(async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  UPDATE LAST MESSAGE (either user or seller side)
// =============================================
export const updateLastMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return next(new ErrorHandler("Conversation not found", 404));
    }

    // Whoever is calling this must actually be a member of the conversation
    if (!conversation.members.includes(req.authId)) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    conversation.lastMessage = lastMessage;
    conversation.lastMessageId = lastMessageId;
    await conversation.save();

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

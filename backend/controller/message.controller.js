// // const Messages = require("../model/messages");
// // const ErrorHandler = require("../utils/ErrorHandler");
// // const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// // const express = require("express");
// // const cloudinary = require("cloudinary");
// // const router = express.Router();

// // // create new message
// // router.post(
// //   "/create-new-message",
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const messageData = req.body;

// //       if (req.body.images) {
// //         const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
// //           folder: "messages",
// //         });
// //         messageData.images = {
// //           public_id: myCloud.public_id,
// //           url: myCloud.url,
// //         };
// //       }

// //       messageData.conversationId = req.body.conversationId;
// //       messageData.sender = req.body.sender;
// //       messageData.text = req.body.text;

// //       const message = new Messages({
// //         conversationId: messageData.conversationId,
// //         text: messageData.text,
// //         sender: messageData.sender,
// //         images: messageData.images ? messageData.images : undefined,
// //       });

// //       await message.save();

// //       res.status(201).json({
// //         success: true,
// //         message,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error.message), 500);
// //     }
// //   })
// // );

// // // get all messages with conversation id
// // router.get(
// //   "/get-all-messages/:id",
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const messages = await Messages.find({
// //         conversationId: req.params.id,
// //       });

// //       res.status(201).json({
// //         success: true,
// //         messages,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error.message), 500);
// //     }
// //   })
// // );

// // module.exports = router;

// import Messages from "../model/message.model.js";
// import ErrorHandler from "../utils/ErrorHandler.js";
// import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// // =============================================
// //  CREATE NEW MESSAGE (with optional image upload)
// // =============================================
// export const createMessage = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { conversationId, text, sender } = req.body;

//     //  Local file upload (multer)
//     let images = [];
//     if (req.files && req.files.length > 0) {
//       images = req.files.map((file) => ({
//         public_id: file.filename,
//         url: `uploads/${file.filename}`,
//       }));
//     }

//     const message = new Messages({
//       conversationId,
//       text,
//       sender,
//       images: images.length > 0 ? images : undefined,
//     });

//     await message.save();

//     res.status(201).json({
//       success: true,
//       message,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// // =============================================
// //  GET ALL MESSAGES FOR A CONVERSATION
// // =============================================
// export const getMessages = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const messages = await Messages.find({
//       conversationId: req.params.id,
//     }).sort({ createdAt: 1 }); // oldest first

//     res.status(200).json({
//       success: true,
//       messages,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });


import Messages from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// =============================================
//  CREATE NEW MESSAGE (with optional image upload)
// =============================================
export const createMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { conversationId, text, sender } = req.body;

    // Sender in the body must match whoever is actually authenticated,
    // and that person must be a member of this conversation.
    if (req.authId !== sender) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.members.includes(req.authId)) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        public_id: file.filename,
        url: `uploads/${file.filename}`,
      }));
    }

    const message = new Messages({
      conversationId,
      text,
      sender,
      images: images.length > 0 ? images : undefined,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// =============================================
//  GET ALL MESSAGES FOR A CONVERSATION
// =============================================
export const getMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation || !conversation.members.includes(req.authId)) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    const messages = await Messages.find({
      conversationId: req.params.id,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

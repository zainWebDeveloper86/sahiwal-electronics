import express from "express";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js"; 
import Shop from "../model/shop.model.js";
import Event from "../model/event.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// create event
export const createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    } else {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer, "sahiwal-electronics/events")
      );
      const results = await Promise.all(uploadPromises);

      const imageUrls = results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));

      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const event = await Event.create(productData);

      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get all events of a shop
export const getAllShopEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// delete event of a shop
export const deleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const eventData = await Event.findByIdAndDelete(req.params.id);

    if (!eventData) {
      return next(new ErrorHandler("Event is not found with this id", 404));
    }

    // delete all images from Cloudinary
    for (const image of eventData.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    res.status(200).json({
      success: true,
      message: "Event Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get all events
export const getAllEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// =============================================
// GET ALL EVENTS (ADMIN ONLY)
// =============================================
export const getAllAdminEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

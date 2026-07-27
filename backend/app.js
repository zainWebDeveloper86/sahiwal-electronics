import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";
import userRouter from "./routes/users.route.js";
import shopRouter from "./routes/shop.route.js";
import productRouter from "./routes/product.route.js";
import eventRouter from "./routes/event.route.js";
import couponRouter from "./routes/couponCode.route.js";
import orderRouter from "./routes/order.route.js";
import conversationRouter from "./routes/conversation.route.js";
import messageRouter from "./routes/message.route.js";
import withdrawRouter from "./routes/withdraw.route.js";
import connectDatabase from "./config/database.js";
import cors from "cors";

const app = express();
await connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));

// here routes
app.use("/api/v2/user", userRouter);
app.use("/api/v2/shop", shopRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/event", eventRouter);
app.use("/api/v2/coupon", couponRouter);
app.use("/api/v2/order", orderRouter);
app.use("/api/v2/conversation", conversationRouter);
app.use("/api/v2/message", messageRouter);
app.use("/api/v2/withdraw", withdrawRouter);

// error handling middleware
// app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

export default app;
// import express from "express";

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Backend Running 🚀");
// });

// export default app;
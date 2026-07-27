import app from "../app.js";
import connectDatabase from "../config/database.js";

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = true;
      console.log("Database connected (Vercel)");
    } catch (error) {
      console.error("Database connection failed:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Database connection failed" });
    }
  }

  app(req, res);
}

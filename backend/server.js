import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// .env load
dotenv.config();

import { createServer } from "http";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import { initializeSocket } from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
  process.exit(1);
});

// database connection
try {
  await connectDatabase();
  console.log("Database connected successfully");
} catch (error) {
  console.log("Database connection failed:", error.message);
  process.exit(1);
}

// create HTTP server
const httpServer = createServer(app);
initializeSocket(httpServer);

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for unhandled promise rejection");
  httpServer.close(() => {
    process.exit(1);
  });
});

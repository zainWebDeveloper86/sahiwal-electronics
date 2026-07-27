import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  // on every request Socket.IO initialize server (on first time)
  if (!io) {
    const server = req.socket.server; // Internal HTTP server of Vercel
    io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("🔌 Client connected:", socket.id);

      socket.on("addUser", (userId) => {
        socket.userId = userId;
        io.emit("getUsers", getOnlineUsers());
      });

      socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
        const receiver = getReceiverSocket(receiverId);
        if (receiver) {
          receiver.emit("getMessage", {
            senderId,
            text,
            images,
            createdAt: Date.now(),
          });
        }
      });

      socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
        socket.broadcast.emit("updateLastMessage", {
          lastMessage,
          lastMessageId,
        });
      });

      socket.on("disconnect", () => {
        io.emit("getUsers", getOnlineUsers());
        console.log("🔌 Client disconnected:", socket.id);
      });
    });
  }

  // response for Socket connection
  res.status(200).json({ success: true, message: "Socket.IO ready" });
}

const getOnlineUsers = () => {
  const users = [];
  const connectedSockets = io.sockets.sockets;
  for (let [id, socket] of connectedSockets) {
    if (socket.userId) {
      users.push({ userId: socket.userId, socketId: id });
    }
  }
  return users;
};

const getReceiverSocket = (receiverId) => {
  const connectedSockets = io.sockets.sockets;
  for (let [id, socket] of connectedSockets) {
    if (socket.userId === receiverId) {
      return socket;
    }
  }
  return null;
};

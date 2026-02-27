const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// 🔥 Store latest code per room
const rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 🏠 Join Room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);

    // Send existing code if room already has code
    if (rooms[roomId]) {
      socket.emit("receive-code", rooms[roomId]);
    }
  });

  // 📝 Code Change
  socket.on("code-change", ({ roomId, code }) => {
    rooms[roomId] = code; // Save latest code
    socket.to(roomId).emit("receive-code", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
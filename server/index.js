// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();

// app.use(cors()); // allow all origins temporarily
// app.use(express.json());


// app.post("/run", async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);

//     const { language, version, code } = req.body;

//     const response = await axios.post(
//       "https://emkc.org/api/v2/piston/execute",
//       {
//         language,
//         version,
//         files: [{ content: code }],
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("Backend error:", error.response?.data || error.message);
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });


// app.listen(8000, () => {
//   console.log("Server running on port 8000");
// });


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

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("receive-code", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
import { io } from "socket.io-client";

export const socket = io("https://developerconnect-server.onrender.com", {
  transports: ["websocket"],
});
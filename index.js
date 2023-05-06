const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
  });

  socket.on("message", (message) => {
    const roomId = message.roomId; // Change this to the actual room ID
    io.to(roomId).emit("message", message);
    // socket.emit("message", "message from server");
    console.log(`Message received: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

const PORT = 3001; // Change this to your desired port number
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

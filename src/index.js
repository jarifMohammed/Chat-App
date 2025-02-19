

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");



const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("mew websocket connection");

  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("sendMessage", (message, callback) => {
    
    

    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", (cords, callback) => {
    io.emit(
      "locationMessage",
      `https://google.com/maps?q=${cords.latitude},${cords.longitude}`
    );
    callback()
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

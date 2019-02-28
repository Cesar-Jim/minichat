const express = require("express");
const app = express();

// set the engine view using ejs
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

// Listen to port
server = app.listen(5000);

const io = require("socket.io")(server);

// Listen on every single connection
io.on("connection", socket => {
  console.log("New user connected");

  // Set a default username
  socket.username = "Anonymous";

  // Listen on "change username"
  socket.on("change_username", data => {
    socket.username = data.username;
  });

  // Listen on new_message
  socket.on("new_message", data => {
    // broadcast new message
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username
    });
  });

  // Listen on typing
  socket.on("typing", data => {
    socket.broadcast.emit("Typing", { username: socket.username });
  });
});

module.exports = app;

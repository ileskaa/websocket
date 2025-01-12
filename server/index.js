import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// import.meta contains information about the module, such as the module's URL
const pathToCurrentFile = fileURLToPath(import.meta.url);
console.log("path to file:", pathToCurrentFile);
const __dirname = path.dirname(pathToCurrentFile);

const PORT = process.env.port || 3500;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : // CORS won't understand the plain localhost
          ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  // Every user that connects gets a different ID
  console.log(`User ${socket.id} connected`);

  // goes only to the user that just connected
  socket.emit("message", "Welcome!");

  // goes to all users except the one that just connected
  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} connected`
  );

  // Listening for message events
  socket.on("message", (data) => {
    console.log("Data:", data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });

  // goes to all other users
  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} disconnected`
    );
  });

  // Listening for activity
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});

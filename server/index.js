import { createServer } from "node:http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
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

  // A buffer is a global object that provides a way to work with binary data
  socket.on("message", (data) => {
    console.log("Data:", data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});

httpServer.listen(3500, () => console.log("Listening on port 3500"));

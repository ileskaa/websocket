import { WebSocketServer } from "ws";
const server = new WebSocketServer({ port: 3000 })

server.on('connection', socket => {
  // A buffer is a global object that provides a way to work with binary data
  socket.on('message', messageBuffer => {
    console.log('Buffered message:', messageBuffer);
    console.log('Actual message', messageBuffer.toString());
    // Send back the message the serv just received
    socket.send(`${messageBuffer}`)
  })
})
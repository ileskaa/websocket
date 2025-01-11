// Connect to the WebSocket server
const socket = io("ws://localhost:3500");

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
  input.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for messages from the server
socket.on("message", (data) => {
  console.log("Message received by client", data);
  const li = document.createElement("li");
  // 'data' is the message from the server
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

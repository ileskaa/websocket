// Connect to the WebSocket server
const socket = io("ws://localhost:3500");

const activity = document.querySelector(".activity");
const msgInput = document.querySelector("input");

function sendMessage(e) {
  e.preventDefault();
  if (msgInput.value) {
    socket.emit("message", msgInput.value);
    msgInput.value = "";
  }
  msgInput.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for messages from the server
socket.on("message", (data) => {
  activity.textContent = "";
  const li = document.createElement("li");
  // 'data' is the message from the server
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

let activityTimer;
socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;

  // clear activity msg after 1 sec
  clearTimeout(activityTimer); // cancel previously est. timeout
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 1000);
});

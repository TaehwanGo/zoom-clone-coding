const socket = io(); // html head에 추가한 socket.io.js가 window에 io함수를 추가함

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("#formEnterRoom");
const formSendMessage = document.querySelector("#formSendMessage");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

function handleSubmitMessage(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  socket.emit("message_sent", input.value, roomName, () => {
    addMessage(`You: ${input.value}`);
    input.value = "";
  });
}

form.addEventListener("submit", handleRoomSubmit);
formSendMessage.addEventListener("submit", handleSubmitMessage);

socket.on("welcome", () => {
  addMessage("Someone joined!");
});

socket.on("disconnected", () => {
  addMessage("Someone has been disconnected");
});

socket.on("new_message", addMessage);

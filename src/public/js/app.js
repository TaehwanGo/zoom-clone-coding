const socket = io(); // html head에 추가한 socket.io.js가 window에 io함수를 추가함

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msgFromBackend) {
  // 백엔드에서 프론트에서 실행되는 함수에 argument를 넘길 수 있다
  console.log(`The backend say: ${msgFromBackend}`);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit(
    // 1번째 arg : event
    "enter_room",
    // 여러개의 arguments를 넘길 수 있다
    {
      payload: input.value,
    },
    5,
    "hello",
    1234,
    backendDone
  );
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

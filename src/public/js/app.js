const socket = io(); // html head에 추가한 socket.io.js가 window에 io함수를 추가함

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit(
    // 1번째 arg : event
    "enter_room",
    // 2번째 arg : payload
    {
      payload: input.value,
    },
    // 3번째 arg : 서버에서 호출하는 function - 프론트에서 백엔드에 함수를 전달 - 백엔드가 프론트의 함수를 실행시킬 수 있음
    () => {
      console.log("server is done!!!");
    }
  );
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

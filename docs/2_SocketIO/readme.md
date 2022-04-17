# 2. SocketIO

- Socket.IO enables real-time, bidirectional and event-based communication.
  - 실시간, 양방향, event기반의 통신을 가능하게 함
- It works on every platform, browser or device, focusing equally on reliability and speed.

## 2.0 SocketIO vs. WebSockets

- SocketIO는 framework(library)이다.
  - WebSockets은 SocketIO가 이용하는 많은 방법들 중 하나이다
  - 만약 브라우저나 모바일에서 WebSockets를 지원하지 않더라도 동작함(다른 방법을 사용해서라도)
    - WebSockets을 지원하지 않는다면 HTTP long-polling을 사용

### SocketIO

#### Features

- WebSockets을 지원하지 않는다면 HTTP long-polling을 사용
- automatic reconnection : wifi 연결등이 끊어지면 다시 연결을 시도 함

## 2.1 Installing SocketIO

- https://www.npmjs.com/package/socket.io
- `npm i socket.io`

- SocketIO도 ws와 같이 http서버 위에 웹소켓 서버를 올리는 방식으로 구현

```js
// 기존 - ws 사용한 서버 구성
import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

server.listen(3000, handleListen);
```

```js
// Socket.IO를 이용한 서버 구성
import http from "http";
import SocketIO from "socket.io";

const server = http.createServer(app);
const io = SocketIO(server);

server.listen(3000, handleListen);
```

### 프론트 Socket IO 셋업

- http://localhost:3000/socket.io/socket.io.js 에서 js 파일 확인 가능
  - 사용자한테 제공되는 socket.io.js 파일
    - 브라우저의 WebSocket보다 기능이 많기 때문
      - 브라우저에서 WebSocket을 지원안해도 HTTP long-polling으로 유사하게 구현하거나
      - wifi등이 끊어졌을 때 재연결하는 기능 등
    - client(브라우저)에서도 서버에서 제공한 socket.io.js를 사용

```html
<!-- head또는 body맨뒤에 추가 -->
<script src="/socket.io/socket.io.js" defer></script>
```

- 브라우저에서 기본으로 제공하는 Web API가 아닌 라이브러리처럼 가져와서 사용
- window에 io 함수가 추가 됨
  - 백엔드와 웹소켓 통신을 할 수 있도록 도와주는 함수

## 2.2 SocketIO is Amazing

- SocketIO는 이미 room 개념을 가지고 있음
- socket.emit(event, payload)

  - socket.send와 비슷하지만 기능이 더 많음
  - 자세한건 공식문서를 읽어봐야 함
  - event는 프론트와 백에서 원하는 것으로 맞출 수 있음(정해져있지 않음)

- ws는 Javascript Object를 전송할 수 없어서 string으로 바꿔줘야했으나
  Javascript Object를 전송 가능

```js
// frontend
socket.emit(
  // 1번째 arg : event
  "enter_room",
  // 2번째 arg : payload
  {
    payload: input.value,
  },
  // 3번째 arg : 서버에서 호출하는 function - 프론트에서 백엔드에 함수를 전달
  () => {
    console.log("server is done!");
  }
);
```

- 프론트에서 서버로 함수를 전달 가능

```js
// backend
wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 5000);
  });
});
```

- done이 프론트에서 전달받은 함수이다
  - 프론트에서 실행 됨

## 2.3 Recap

- socket.emit 메서드
  - 커스텀 이벤트 설정 가능
  - text뿐만 아니라 js object를 넘길 수 있음
  - 여러개의 payload(argument)를 넘길 수 있다
    - 심지어 함수를 넘기고 백엔드에서 그 함수를 실행하게 할 수 있다(실행은 프론트에서 됨)
      - 함수를 넘기고 싶으면 반드시 마지막에 넘겨줘야 함
      - 심지어 백엔드에서 프론트에서 실행되는 함수에 argument를 넘길 수 있다

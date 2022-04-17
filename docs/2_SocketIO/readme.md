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

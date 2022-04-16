# 1. Chat with Websockets

## 1.0 Introduction

- 채팅 프로그램을 만들 것임
  - 간단하게 메세지 보내기, 받기
    - 익명
- 이후 기능 추가
  - 닉네임
  - 입장, 퇴장 같은 이벤트 추가
  - 방에 몇명이 접속중인지 확인, 우리 서버에 방이 몇개인지 확인
  - 방 개념 - 채널이나 서버 같은 개념

## 1.1 HTTP vs. WebSockets

![](./websockets-http.png)

- 둘다 프로토콜
  - http, https
  - ws, wss

| 구분 | HTTP                                             | WebSocket                                                    |
| ---- | ------------------------------------------------ | ------------------------------------------------------------ |
| 연결 | 1요청을 보내면 1응답 후 연결이 끊어짐(stateless) | 연결되면 서버가 유저를 기억하고 연결을 유지함                |
|      | 서버가 먼저 응답을 줄순 없음(realtime불가능)     | 양방향(bi-directional) 연결, 서버가 먼저 응답을 줄 수도 있음 |

- WebSocket

  - TCP를 사용, 3way-hand shaking 과정이 필요
  - 웹소켓은 브라우저와 백엔드 뿐만아니라 백엔드간 통신에서도 사용될 수 있음

- 자세히 알아보기
  - https://blog.scaleway.com/iot-hub-what-use-case-for-websockets/

## 1.2 WebSockets in NodeJS

- 웹소켓 프로토콜을 앱에서 사용하기 위해 `ws` 패키지를 사용
- 웹소켓 프로토콜을 사용한다는 것의 의미 - websocket implementation

  - 프로토콜(규약)에 맞는 코드를 만들어 실행한다는 의미
    - ws라이브러리는 웹소켓 프로토콜을 따라 만들고 그것을 쉽게 이용가능하도록 한 것

- 지금 간단히 ws라이브러를 사용해서 무언가를 만들어보고
- ws를 기반으로한 다른 라이브러리를 나중에 사용
  - ws를 사용한 framework가 있음
    - 채팅방 기능이 존재

`npm i ws`

- ws서버를 직접만들진 않고 express서버에 합쳐서 사용할 예정

express는 ws를 지원하지 않으므로 node.js에 있는 http package를 사용

## 1.3 WebSocket Events

- https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket

```js
new WebSocket(url);
new WebSocket(url, protocols);
```

- 브라우저에서 Web API로 WebSocket 연결을 도와주는 메서드를 제공함
  - 프론트엔드에선 따로 웹소켓 관련해서 뭘 설치하지 않아도 됨
  - addEventListener같이 event를 설정 후 callback function을 전달해주면 됨

#### 서버 설정

```js
import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function handleConnection(socket) {
  console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
```

#### 프론트 설정

- 서버에서 설정을 해서 웹소켓을 열어놓았다면 프론트에선 연결하기 위해 Web API를 사용해야한다

```js
const socket = new WebSocket("http://localhost:3000");
// Uncaught DOMException: Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. 'http' is not allowed.

// http가 아닌 ws 프로토콜을 이용하도록함
// base URL을 window.location.host로 자동으로 찾게 함
const socket = new WebSocket(`ws://${window.location.host}`);
```
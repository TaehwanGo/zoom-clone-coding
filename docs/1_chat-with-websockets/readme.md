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

## 1.4 WebSocket Messages

- server에서 메세지를 보내고
- 프론트에서 소켓 인스턴스에 이벤트 리스너를 설정해서 메세지를 받아봄

  - MessageEvent의 data에 서버에서 보낸 메세지가 들어 있음

- 프론트에서 타임아웃을 설정해서 5초뒤 메세지를 보내도록 설정해봄
  - server에서 메세지를 받을 때
    - `<Buffer 48 65 6c 6c 6f 20 66 72 6f 6d 20 74 68 65 20 62 72 6f 77 73 65 72 21>` 로 나옴
    - `message.toString("utf-8")` UTF-8로 디코드 해주면 정상적으로 출력 됨
      - ws 라이브러리 버전이 올라가면서 WebSocketServer객체를 wss생성자로 사용하면서 달라진 부분인 것 같다

## 1.5 Recap

- 프론트와 백엔드에서 웹소켓 세팅을 하고 이벤트를 간단히 전달하고 받아봄
- websocket을 이용하면 서버에서 먼저 메세지를 보낼 수 있음

## 1.6 Chat Completed

- 지금까지 작성한 코드

  - 혼자 메세지를 보내면 자기자신한테 되돌아옴
    - 받은 메세지를 보여주는 엘리먼트를 추가하면 될 거 같은데
      - 그러면 여러명이서 대화 가능할 듯 - 귓속말은 안되겠지만
      - 아니야 실시간으로 반영되려면 static파일에 변화가 있어야 될텐데 그건 안될 듯

- 채팅이 보여지려면 연결된 모든 사람한테 메세지를 줘야됨
  - 임시 DB로 array를 만들어서 그 안에 연결된 모든 유저들에게 메세지를 보내서 채팅이 가능하게 함

## 1.7 ~ 1.8 Nicknames

- append vs. appendChild

  - append
    - `(method) ParentNode.append(...nodes: (string | Node)[]): void`
    - string 또는 Node를 하나 또는 여러개 받을 수 있다
    - return값 없음
  - appendChild
    - `(method) Node.appendChild<HTMLLIElement>(node: HTMLLIElement): HTMLLIElement`
    - HTMLLIElement 만 그리고 하나만 받을 수 있다
    - return : 새로 추가하려는 전달한 HTMLLIElement이 리턴 됨
  - 참고 : https://webruden.tistory.com/634

- message 구분
  - 닉네임을 위한 메세지와 채팅을 위한 메세지를 구분
  - 이전에 text만 보냈지만 구분을 위해 json으로 type 속성을 추가해서 보냄

```js
{
  type: "new_message",
  payload: "hello! someone"
}

{
  type: "nickname",
  payload: "Tony"
}
```

- 주고 받는 데이터
  - front에서 메세지를 보낼 때 javascript object를 보내는 대신 JSON.stringify 로 보냄
  - back에선 stringify된 것을 받아서 JSON으로 parsing하고 타입과 메세지를 추출해서 메세지를 보냄

## 1.9 Conclusion

### 이슈 1. 내가 보낸 메세지는 내가 받지 않게 할 수도 있다.

- 내가 보낸 메세지는 보낸 즉시 채팅 리스트에 추가
- 내가 보낸 메세지는 서버에서 나를 제외한 나머지 사람한테 전송

### 이슈 2. 프론트에서 Text형식의 메세지만 받고 있다

- 백엔드에서 JSON 같이 여러 데이터를 포함한 메세지를 보내는 것에 대한 대비가 안되어 있다

### 이슈 3. 누군가 나갔을 때 sockets에서 제거해야 한다

- 위와 같은 이슈들을 쉽게 다룰 수 있는 socket framework에 대해 알아보자 => 2.0

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

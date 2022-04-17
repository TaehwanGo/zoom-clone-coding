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

import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");

app.use("/public", express.static(__dirname + "/public")); // user가 볼수 있는 폴더를 따로 지정

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); // http server

// 둘중 하나만 돌리고 싶으면 http서버는 전달하지 않고 ws프로토콜만 사용할 수도 있음
// 웹소켓 서버를 http서버 위에 생성한 상태
const wss = new WebSocketServer({ server }); // http서버, web socket서버 둘다 돌릴 수 있음 - 3000번 포트

function handleConnection(socket) {
  console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);

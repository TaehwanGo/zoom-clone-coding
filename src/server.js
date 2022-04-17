import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");

app.use("/public", express.static(__dirname + "/public")); // user가 볼수 있는 폴더를 따로 지정

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event : ${event}`);
  });
  socket.on("enter_room", (roomName, showRoom) => {
    console.log("socket.rooms", socket.rooms);
    socket.join(roomName);
    showRoom();
    socket.to(roomName).emit("welcome");
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      // 내가 들어간 룸(내가 속한 방)들에게 알리기 때문에 forEach
      socket.to(room).emit("disconnected")
    );
  });
  socket.on("message_sent", (message, roomName, done) => {
    socket.to(roomName).emit("new_message", message);
    done(); // done은 프론트에서 받은 코드를 프론트에서 실행시킴
  });
});

httpServer.listen(3000, handleListen);

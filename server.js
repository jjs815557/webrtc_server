const app = require("express")();
const { Server } = require("socket.io");
const port = 3000;

//-----------------------------------------------------//
async function server() {
  const http = require("http").createServer(app);
  const io = new Server(http, { transports: ["websocket"] });

  const roomName = "room1234";

  io.on("connection", (socket) => {
    console.log("socket connected");
    socket.on("join", () => {
      //클라이언트의 roomName을 받아서 처리해도됨
      socket.join(roomName);
      socket.to(roomName).emit("joined");
    });
    socket.on("offer", (offer) => {
      socket.to(roomName).emit("offer", offer);
    });

    socket.on("offer", (offer) => {
      socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer) => {
      socket.to(roomName).emit("answer", answer);
    });
    socket.on("ice", (ice) => {
      socket.to(roomName).emit("ice", ice);
    });
  });

  http.listen(port, () => {
    console.log("server open!");
  });
}

server();

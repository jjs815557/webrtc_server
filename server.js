// server.js
const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("messageFromClient", (data) => {
    console.log("Message from client:", data);
    // Broadcasting the message to all connected clients
    io.emit("messageFromServer", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const cors = require("cors");

// let io = require("socket.io")(http, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());

// io.on("connection", (socket) => {
//   console.log("socket", socket.id);

//   console.log("user roomname : ", socket.id);
//   socket.on("connect", (data) => {
//     print(data);
//   });
// });

// http.listen(port, () => {
//   console.log(`server is runing port ${port}`);
// });

// let port = process.env.PORT || 5000;

/**
 *
 */
// let IO = require("socket.io")(port, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// IO.use((socket, next) => {
//   if (socket.handshake.query) {
//     let callerId = socket.handshake.query.callerId;
//     socket.user = callerId;
//     next();
//   }
// });

// IO.on("connection", (socket) => {
//   console.log(socket.user, "Connected");

//   socket.join(socket.user);

//   socket.on("makeCall", (data) => {
//     let calleeId = data.calleeId;
//     let sdpOffer = data.sdpOffer;

//     socket.to(calleeId).emit("newCall", {
//       callerId: socket.user,
//       sdpOffer: sdpOffer,
//     });
//   });

//   socket.on("answerCall", (data) => {
//     let callerId = data.callerId;
//     let sdpAnswer = data.sdpAnswer;

//     socket.to(callerId).emit("callAnswered", {
//       callee: socket.user,
//       sdpAnswer: sdpAnswer,
//     });
//   });

//   socket.on("IceCandidate", (data) => {
//     let calleeId = data.calleeId;
//     let iceCandidate = data.iceCandidate;

//     socket.to(calleeId).emit("IceCandidate", {
//       sender: socket.user,
//       iceCandidate: iceCandidate,
//     });
//   });
// });

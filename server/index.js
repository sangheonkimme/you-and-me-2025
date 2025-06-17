const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const cors = require("cors");

class SocketServer {
  constructor() {
    if (SocketServer.instance) {
      return SocketServer.instance;
    }

    this.app = express();
    this.server = http.createServer(this.app);
    this.STATIC_PORT = 8080;

    this.io = new Server(this.server, {
      cors: {
        origin: [
          "http://localhost:3000",
          "https://you-and-me-2025.vercel.app",
          "https://admin.socket.io",
        ],
        credentials: true,
      },
    });

    this.setupAdminUI();
    this.setupMiddleware();
    this.setupSocketHandlers();

    SocketServer.instance = this;
  }

  setupAdminUI() {
    instrument(this.io, {
      auth: false,
      mode: "development",
    });
  }

  setupMiddleware() {
    this.app.use(cors());
  }

  setupSocketHandlers() {
    this.io.on("connect", (socket) => {
      console.log("Connection to Client 🔥");
      socket["nickname"] = "Anon";
      this.io.sockets.emit("roomList", this.countPublicRooms());

      socket.on("enterRoom", (roomName, done) => {
        socket.join(roomName);
        done(roomName);
        this.io.sockets.emit(
          "enterRoom",
          {
            type: "join",
            nickname: socket.nickname,
            message: socket.nickname + "join!!",
          },
          this.countPeopleInRoom(roomName)
        );
        this.io.sockets.emit("roomListChange", this.countPublicRooms());
      });

      socket.on("disconnecting", () => {
        socket.rooms.forEach((room) =>
          socket.to(room).emit(
            "leftRoom",
            {
              type: "left",
              nickname: socket.nickname,
              message: socket.nickname + "left this room ㅠㅠ",
            },
            this.countPeopleInRoom(room) - 1
          )
        );
      });

      socket.on("disconnect", () => {
        this.io.sockets.emit("roomListChange", this.countPublicRooms());
      });

      socket.on("newMessage", (message, room, done) => {
        socket.to(room).emit("newMessage", {
          type: "message",
          nickname: socket.nickname,
          message: message,
        });
        done();
      });

      socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
    });
  }

  countPublicRooms() {
    const { sids, rooms } = this.io.sockets.adapter;
    const publicRooms = [];

    rooms.forEach((_, key) => {
      if (sids.get(key) === undefined) {
        !publicRooms.includes(key) && publicRooms.push(key);
      }
    });

    return publicRooms;
  }

  countPeopleInRoom(roomName) {
    return this.io.sockets.adapter.rooms.get(roomName)?.size;
  }

  start() {
    this.server.listen(process.env.PORT || this.STATIC_PORT, () => {
      console.log(
        `Listening on http://localhost:${process.env.PORT || this.STATIC_PORT}`
      );
    });
  }

  getIO() {
    return this.io;
  }

  getServer() {
    return this.server;
  }
}

// 싱글톤 인스턴스 생성 및 서버 시작
const socketServer = new SocketServer();
socketServer.start();

/*
  TODO:
  메세지 데이터 저장 및 새로고침시 메세지 배열 보내기
*/

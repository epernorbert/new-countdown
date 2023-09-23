const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "countdown",
});

app.get("/test", (request, response) => {
  console.log("test");
  return response.json("From backend side");
});

app.get("/controller-list", (request, response) => {
  const SQL = "SELECT * FROM controller";
  db.query(SQL, (error, data) => {
    if (error) {
      return response.json(error);
    } else {
      return response.json(data);
    }
  });
});

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data);
  });
  socket.join("clock-room");

  console.log("client connected: ", socket.id);

  socket.on("send-timer", (data) => {
    socket.to(data.id).emit("timer", data.timer);
  });

  socket.on("start-timer", (data) => {
    socket.to(data.id).emit("start", data.statusRef.current);
  });

  socket.on("pause-timer", (data) => {
    socket.to(data.id).emit("pause", data.statusRef.current);
  });

  socket.on("stop-timer", (data) => {
    socket.to(data.id).emit("stop", data.statusRef.current);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });

  socket.on("send-message", (data) => {
    socket.to(data.id).emit("message", data);
  });
});

const getTime = (date) =>
  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

setInterval(() => {
  io.to("clock-room").emit("currentTime", getTime(new Date()));
}, 1000);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});

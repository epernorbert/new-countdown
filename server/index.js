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

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "countdown",
});

app.get("/active-controller/:controller_key", (request, response) => {
  const controller_key = request.params.controller_key;
  const SQL = `SELECT * FROM controller WHERE controller_key = '${controller_key}'`;
  db.query(SQL, (error, data) => {
    if (error) {
      return response.json(error);
    } else {
      return response.json(data);
    }
  });
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

app.post("/create-room/:room", (request, response) => {
  const room = request.params.room;
  const SQL = `SELECT * FROM controller WHERE controller_name = '${room}'`;
  db.query(SQL, (error, data) => {
    if (error) {
      return response.json(error);
    } else {
      if (data.length === 0) {
        const formInputRoom = request.body.room;
        const key = request.body.key;

        if (room === formInputRoom) {
          const SQL = `INSERT INTO controller (controller_name, controller_key) VALUES ('${room}', '${key}')`;
          db.query(SQL, (error, data) => {
            if (error) {
              return response.json(error);
            } else {
              return response.json(data);
            }
          });
        }
      }
    }
  });
});

app.get("/controller-key/:room", (request, response) => {
  const room = request.params.room;
  const SQL = `SELECT controller_key FROM controller WHERE controller_name = '${room}'`;
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

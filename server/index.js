const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const io = socketIo(server,{ 
  cors: {
    origin: 'http://localhost:3000'
  }
}) //in case server and client run on different urls

io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id) // terminal
  
  socket.join('clock-room')
  
  socket.on('send-timer', timer => {
    console.log(timer); // terminal
    socket.broadcast.emit('timer', timer); // because the broadcast send every client but who send
  })

  socket.on('start-timer', status => {
    console.log(status); // terminal
    socket.broadcast.emit('start', status); // because the broadcast send every client but who send
  })

  socket.on('pause-timer', status => {
    console.log(status); // terminal
    socket.broadcast.emit('pause', status); // because the broadcast send every client but who send
  })

  socket.on('stop-timer', status => {
    console.log(status); // terminal
    socket.broadcast.emit('stop', status); // because the broadcast send every client but who send
  })

  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })  
})

const getTime = (date) => (
  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
)

setInterval(()=>{
  io.to('clock-room').emit('currentTime', getTime(new Date()))
}, 1000)

server.listen(PORT, err => {
  if (err) console.log(err)
  console.log('Server running on Port ', PORT)
})
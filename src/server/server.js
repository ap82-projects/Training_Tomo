const express = require('express')
const app = express()
const port = 5000

const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: {origin: "*"}
})
io.on('connection', socket => {
  console.log('user connected via socket');
  socket.on('message', message => {
    console.log(message)
    io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
  })
})
http.listen(8080, () => console.log('socket server on 8080'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`express listening at http://localhost:${port}`)
})
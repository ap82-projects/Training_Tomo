const express = require('express')
const app = express()
const port = 5000
const testWorkouts = require('./testWorkouts.js')

const workoutRooms = {}
const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: { origin: "*" }
})

io.on('connection', socket => {
  console.log('user connected via socket');
  socket.on('message', user => {
    console.log(`${user} has connected`)
    io.emit('message', `${socket.id.substr(0, 2)} said you are now connected`)
  })
  socket.on('joinWorkout', idAndWorkout => {
    if (!workoutRooms[idAndWorkout.workout]) {
      workoutRooms[idAndWorkout.workout] = {}
    }
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId] = {}
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].name = idAndWorkout.userName;
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress = [];
    //next need to push falses for each exercise in workout
    testWorkouts
      .filter(e => e.id === idAndWorkout.workout)[0].exercises
      .forEach(() => workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.push(false));
    // io.emit('message', `${socket.id.substr(0,2)} said you are now connected`)
  })
  socket.on('leaveWorkout', idAndWorkout => {
    delete workoutRooms[idAndWorkout.workout][idAndWorkout.userId];
    console.log(workoutRooms);
    if(!Object.keys(workoutRooms[idAndWorkout.workout]).length) {
      delete workoutRooms[idAndWorkout.workout];
    }
    console.log(workoutRooms);
  })
  socket.on('completedExercise', idAndWorkout => {
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.unshift(true);
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.pop();
    console.log(workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress)
    // io.emit('completedExercise', workoutRooms)
  })
  
})
http.listen(8080, () => console.log('socket server on 8080'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`express listening at http://localhost:${port}`)
})
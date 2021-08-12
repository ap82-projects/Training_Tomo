const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const http = require('http').createServer();
const testWorkouts = require('./testWorkouts.js')
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const server = app.listen(port, () => {
  console.log(`express listening on port :${port}`);
});

const workoutRooms = {}

const io = socket(server)

io.on('connection', socket => {
  console.log('user connected via socket');
  io.emit('getWorkouts', testWorkouts)

  socket.on('getWorkouts', () => {
    io.emit('getWorkouts', testWorkouts)
  });

  socket.on('joinWorkout', idAndWorkout => {
    if (!workoutRooms[idAndWorkout.workout]) {
      workoutRooms[idAndWorkout.workout] = {}
    }
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId] = {}
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].name = idAndWorkout.userName;
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress = [];
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].ready = false;
    //next need to push falses for each exercise in workout
    testWorkouts
      .filter(e => e.id === idAndWorkout.workout)[0].exercises
        .forEach(() => workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.push(false));
    console.log(workoutRooms)
    io.emit('roomStatus', workoutRooms)
  });

  socket.on('leaveWorkout', idAndWorkout => {
    delete workoutRooms[idAndWorkout.workout][idAndWorkout.userId];
    console.log(workoutRooms);
    if(!Object.keys(workoutRooms[idAndWorkout.workout]).length) {
      delete workoutRooms[idAndWorkout.workout];
    }
    console.log(workoutRooms);
    io.emit('roomStatus', workoutRooms)
  });

  socket.on('completedExercise', idAndWorkout => {
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.unshift(true);
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.pop();
    // console.log(workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress)
    console.log(workoutRooms[idAndWorkout.workout][idAndWorkout.userId])
    io.emit('completedExercise', workoutRooms)
    io.emit('roomStatus', workoutRooms)
    if (workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.every(e => e)) {
      io.emit('winner', idAndWorkout.userId);
    }
  });

  socket.on('ready', readyUser => {
    workoutRooms[readyUser.workout][readyUser.userId].ready = true;
    io.emit('roomStatus', workoutRooms);
    const areAllReady = Object.keys(workoutRooms[readyUser.workout])
      .every(user => workoutRooms[readyUser.workout][user].ready);
    if (areAllReady) {
      io.emit('allReady', true);
    }
  })
});

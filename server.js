const express = require('express')
const cors = require('cors')
const socketIo = require('socket.io')
const testWorkouts = require('./testWorkouts.js')
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const server = app.listen(port, () => {
  console.log(`express listening on port: ${port}`);
});

const workoutRooms = {}

const io = socketIo(server)

io.on('connection', socket => {
  console.log('user connected via socket');
  console.log('connection id: ', socket.id)
  io.emit('getWorkouts', testWorkouts)

  socket.on('disconnect', reason => {
    console.log('user disconnected:')
    console.log(reason)
  })

  socket.on('getWorkouts', () => {
    console.log('getting workouts')
    io.emit('getWorkouts', testWorkouts)
  });

  socket.on('joinWorkout', idAndWorkout => {
    console.log('user joining workout')
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
    console.log('leaveWorkout start: idAndWorkout')
    console.log(idAndWorkout)
    console.log('leaveWorkout 0: workoutRooms')
    console.log(workoutRooms)
    if (workoutRooms[idAndWorkout.workout.id] && workoutRooms[idAndWorkout.workout.id][idAndWorkout.userId]) {
      delete workoutRooms[idAndWorkout.workout.id][idAndWorkout.userId];
    }
    console.log('leaveWorkout 1: workoutRooms')
    console.log(workoutRooms);
    if(workoutRooms[idAndWorkout.workout.id] && !Object.keys(workoutRooms[idAndWorkout.workout.id]).length) {
      delete workoutRooms[idAndWorkout.workout.id];
    }
    console.log('leaveWorkout 2: workoutRooms')
    console.log(workoutRooms);
    io.emit('roomStatus', workoutRooms)
  });

  socket.on('completedExercise', idAndWorkout => {
    console.log('completed exercise')
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.unshift(true);
    workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.pop();
    console.log(workoutRooms[idAndWorkout.workout][idAndWorkout.userId])
    io.emit('completedExercise', workoutRooms)
    io.emit('roomStatus', workoutRooms)
    if (workoutRooms[idAndWorkout.workout][idAndWorkout.userId].progress.every(e => e)) {
      io.emit('winner', idAndWorkout.userId);
    }
  });

  socket.on('ready', readyUser => {
    console.log('ready')
    workoutRooms[readyUser.workout][readyUser.userId].ready = true;
    io.emit('roomStatus', workoutRooms);
    const areAllReady = Object.keys(workoutRooms[readyUser.workout])
      .every(user => workoutRooms[readyUser.workout][user].ready);
    if (areAllReady) {
      io.emit('allReady', true);
    }
  })
});

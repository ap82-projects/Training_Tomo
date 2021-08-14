import React, { useState } from "react"
import UserHeader from './UserHeader';
import Workouts from './Workouts';
import RaceWorkout from './RaceWorkout';
import io from 'socket.io-client';

export default function HomePage(props) {
  const { user, auth } = props;
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [windowHeight] = useState(window.innerHeight);
  const socket = io();
  
  socket.emit('message', `${user.displayName}`)
  
  const pickWorkout = workout => {
    console.log('workout')
    console.log(workout)
    setSelectedWorkout(workout);
    console.log('selected workout')
    console.log(selectedWorkout)
  }

  const leaveWorkout = workoutId => {
    console.log('leaving workout ', workoutId)
    socket.emit('leaveWorkout', {userId: user.providerData[0].uid, userName: user.displayName, workout: workoutId})
    setSelectedWorkout("");
  }

  return (
    <div className="HomePage">
      <UserHeader
        selectedWorkout={selectedWorkout}
        leaveWorkout={leaveWorkout}
        auth={auth}
        user={user}
        windowHeight={windowHeight}
      />
      {selectedWorkout ? 
        <RaceWorkout socket={socket} user={user} selectedWorkout={selectedWorkout} windowHeight={windowHeight} /> : 
        <Workouts socket={socket} pickWorkout={pickWorkout} windowHeight={windowHeight} />}
    </div>
  )
}

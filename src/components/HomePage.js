import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import UserHeader from './UserHeader';
import Workouts from './Workouts';
import RaceWorkout from './RaceWorkout';
import io from 'socket.io-client';

export default function HomePage(props) {
  const { user, auth } = props;
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const socket = io();
  
  socket.emit('message', `${user.displayName}`)
  
  const pickWorkout = workoutId => {
    console.log('workout id')
    console.log(workoutId)
    setSelectedWorkout(workoutId);
    console.log('selected workout')
    console.log(selectedWorkout)
  }

  const leaveWorkout = workoutId => {
    socket.emit('leaveWorkout', {userId: user.providerData[0].uid, userName: user.displayName, workout: workoutId})
    setSelectedWorkout("");
  }

  return (
    <div className="HomePage">
      <UserHeader selectedWorkout={selectedWorkout} leaveWorkout={leaveWorkout} auth={auth} user={user} />
      {selectedWorkout ? 
        <RaceWorkout socket={socket} user={user} selectedWorkout={selectedWorkout} leaveWorkout={leaveWorkout} /> : 
        <Workouts socket={socket} pickWorkout={pickWorkout} />}
    </div>
  )
}

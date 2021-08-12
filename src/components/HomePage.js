import React, { useState } from "react"
// import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'
import UserHeader from './UserHeader';
import Workouts from './Workouts';
import RaceWorkout from './RaceWorkout';
import io from 'socket.io-client';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function HomePage(props) {
  const { user, auth, firestore } = props;
  const [selectedWorkout, setSelectedWorkout] = useState("");
  // const [loggedIn, setLoggedIn] = useState(true)
  const socket = io();
  
  socket.emit('message', `${user.displayName}`)
    // socket.emit('joinWorkout', {name: "me", workout: "123"})
  
  const pickWorkout = workoutId => {
    console.log('workout id')
    console.log(workoutId)
    setSelectedWorkout(workoutId);
    // socket.emit('joinWorkout', {userId: user.providerData[0].uid, userName: user.displayName, workout: workoutId})
    console.log('selected workout')
    console.log(selectedWorkout)
  }

  const leaveWorkout = workoutId => {
    socket.emit('leaveWorkout', {userId: user.providerData[0].uid, userName: user.displayName, workout: workoutId})
    setSelectedWorkout("");
  }

  return (
    <React.Fragment>
      <UserHeader selectedWorkout={selectedWorkout} leaveWorkout={leaveWorkout} auth={auth} user={user} />
      {selectedWorkout ? 
        <RaceWorkout socket={socket} user={user} selectedWorkout={selectedWorkout} leaveWorkout={leaveWorkout} /> : 
        <Workouts socket={socket} pickWorkout={pickWorkout} />}
    </React.Fragment>
  )
}


// const workoutRefs = firestore.collection('workouts');
// console.log(firestore)

// const workoutRef = firestore.collection('workouts');
// console.log(workoutRef)
// const query = workoutRef.orderBy('available');
// // console.log(query)
// const [workouts] = useCollectionData(query, {idfield: 'id'})
// console.log(workouts)
// workoutRef.add({
  //   id: "000",
  //   name: "Workout 1",
  //   available: true,
  //   exercises: [
    //     {
      //       name: "Exercise 1",
      //       reps: 10
      //     },
      //     {
        //       name: "Exercise 2",
        //       reps: 20
        //     },
        //     {
          //       name: "Exercise 3",
          //       reps: 30
          //     }
          //   ]
          // })






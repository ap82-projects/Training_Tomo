import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Workout from './Workout';

export default function Workouts(props) {
  const {
    pickWorkout,
    socket
  } = props;
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    socket.on('getWorkouts', data => {
      if (data) setWorkouts(data);
    });
    console.log('Workouts')
    console.log(workouts)
  })
  socket.on('getWorkouts', data => {
    if (data) {
      setWorkouts(data);
    };
  });
  
  const availableWorkouts = workouts
    .filter(e => e.available)
    .map(e => <Workout pickWorkout={pickWorkout} workout={e} key={e.id} />)
  const windowHeight = window.innerHeight;
  const window80 = Math.floor(windowHeight * .8)
  return (
    <div className="Workouts" style={{overflow: "scroll", height: `${window80}px` }}>
      <h3>Available Workouts</h3>
      {availableWorkouts}
    </div>
  )
}

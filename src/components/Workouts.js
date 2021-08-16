import React, { useState, useEffect } from "react"
import Workout from './Workout';

export default function Workouts(props) {
  const {
    pickWorkout,
    socket,
    windowHeight
  } = props;
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    socket.on('getWorkouts', data => {
      if (data) setWorkouts(data);
      console.log('data')
      console.log(data)
    });
    console.log('Workouts')
    console.log(workouts)
  }, [])
  
  const availableWorkouts = workouts
    .filter(e => e.available)
    .map(e => <Workout pickWorkout={pickWorkout} workout={e} key={e.id} />)
  const window80 = Math.floor(windowHeight * .8)
  return (
    <div className="Workouts" style={{overflow: "scroll", height: `${window80}px` }}>
      <h3>Available Workouts</h3>
      <div className="d-flex justify-content-center">
        {availableWorkouts}
      </div>
    </div>
  )
}

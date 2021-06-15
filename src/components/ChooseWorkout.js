import React, { useState, useEffect } from "react"
// import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'
// import UserHeader from './UserHeader';
import AvailableWorkout from './AvailableWorkout';
// import ChooseWorkout from './ChooseWorkout';

export default function ChooseWorkout(props) {
  const { pickWorkout, socket } = props;
  const [workouts, setWorkouts] = useState([]);
  
  socket.on('getWorkouts', data => {
    if (data) {
      setWorkouts(data);
    };
  });
  console.log(workouts)

  
  const availableWorkouts = workouts
  .filter(e => e.available)
  .map(e => (
    <AvailableWorkout pickWorkout={pickWorkout} workout={e} key={e.id} />
    ))
    
    const windowHeight = window.innerHeight;
    const window80 = Math.floor(windowHeight * .8)
    return (
      <div style={{overflow: "scroll", height: `${window80}px` }}>
      <h3>Available Workouts</h3>
      {availableWorkouts}
    </div>
  )
}



// const testWorkouts = [
//   {
//     id: "000",
//     name: "Workout 1",
//     available: true,
//     exercises: [
//       {
//         name: "Exercise 1",
//         reps: 10
//       },
//       {
//         name: "Exercise 2",
//         reps: 20
//       },
//       {
//         name: "Exercise 3",
//         reps: 30
//       }
//     ]
//   },
//   {
//     id: "001",
//     name: "Workout 2",
//     available: true,
//     exercises: [
//       {
//         name: "Exercise 4",
//         reps: 15
//       },
//       {
//         name: "Exercise 5",
//         reps: 25
//       },
//       {
//         name: "Exercise 6",
//         reps: 35
//       },
//       {
//         name: "Exercise 7",
//         reps: 35
//       }
//     ]
//   },
//   {
//     id: "002",
//     name: "Workout 3",
//     available: true,
//     exercises: [
//       {
//         name: "Exercise 8",
//         reps: 18
//       },
//       {
//         name: "Exercise 9",
//         reps: 27
//       },
//       {
//         name: "Exercise 10",
//         reps: 39
//       },
//       {
//         name: "Exercise 11",
//         reps: 24
//       },
//       {
//         name: "Exercise 12",
//         reps: 32
//       }
//     ]
//   }
// ]

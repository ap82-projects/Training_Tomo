import React from "react"
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'
import UserHeader from './UserHeader';
import AvailableWorkout from './AvailableWorkout';

export default function ChooseWorkout(props) {
  const { user, auth } = props;

  const testWorkouts = [
    {
      id: "000",
      available: true,
      name: "Workout 1",
      exercises: [
        {
          name: "Exercise 1",
          reps: 10
        },
        {
          name: "Exercise 2",
          reps: 20
        },
        {
          name: "Exercise 3",
          reps: 30
        }
      ]
    },
    {
      id: "001",
      name: "Workout 2",
      available: false,
      exercises: [
        {
          name: "Exercise 4",
          reps: 15
        },
        {
          name: "Exercise 5",
          reps: 25
        },
        {
          name: "Exercise 6",
          reps: 35
        },
        {
          name: "Exercise 7",
          reps: 35
        }
      ]
    },
    {
      id: "002",
      name: "Workout 3",
      available: true,
      exercises: [
        {
          name: "Exercise 8",
          reps: 18
        },
        {
          name: "Exercise 9",
          reps: 27
        },
        {
          name: "Exercise 10",
          reps: 39
        },
        {
          name: "Exercise 11",
          reps: 24
        },
        {
          name: "Exercise 12",
          reps: 32
        }
      ]
    }
  ]

  const workouts = testWorkouts
    .filter(e => e.available)
    .map(e => (
      <AvailableWorkout workout={e} />
    ))

  return (
    <div>
      <UserHeader auth={auth} user={user} />

      <div>
        <h3>Available Workouts</h3>
        {workouts}
      </div>
    </div>
  )
}
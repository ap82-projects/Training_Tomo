import React from "react"
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RaceWorkout(props) {
  const { getWorkout } = props;
  return (
    <div>
      <h1>GO!!!</h1>
      <Button onClick={() => getWorkout("")}>Quit Workout</Button>
    </div>
  )
}
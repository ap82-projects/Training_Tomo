import React from "react"
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RaceWorkout(props) {
  const { socket, user, selectedWorkout, leaveWorkout } = props;

  // socket.emit('joinWorkout', {name: user.displayName, workout: "thisone"});
  socket.on('completedExercise', nameAndWorkout => {
    console.log(nameAndWorkout);
  });
  console.log(user.providerData[0].displayName)
  console.log(user.providerData[0].uid)
  const complete = () => {
    socket.emit('completedExercise', {id: user.providerData[0].uid, workout: "thisOne"})
  }
  // console.log('refresh')
  /*
  
  */

  return (
    <div>
      <h1>GO!!!</h1>
      <Button variant="success" onClick={() => complete()}>Finished Exercise</Button>
      <Button variant="danger" onClick={() => leaveWorkout(selectedWorkout)}>Quit Workout</Button>
    </div>
  )
}
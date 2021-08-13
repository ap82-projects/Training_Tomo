import React, { useState, useEffect } from "react"
// import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RaceWorkout(props) {
  const {
    socket,
    user,
    selectedWorkout
  } = props;
  const [roomStatus, setRoomStatus] = useState({});
  const [winner, setWinner] = useState("");
  const [ready, setReady] = useState(false);
  const [allReady, setAllReady] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  console.log("selectedWorkout")
  console.log(selectedWorkout)

  socket.on('completedExercise', nameAndWorkout => {
    console.log('completed exercise')
    console.log(nameAndWorkout);
  });
  socket.on('roomStatus', status => {
    setRoomStatus(status);
    // console.log('room status')
    console.log(status)
    // console.log(status)
  });
  socket.on('allReady', letsGo => {
    setAllReady(true);
  });
  socket.on('winner', user => {
    setWinner(user);
  })

  useEffect(() => {
    socket.emit('joinWorkout', { userId: user.providerData[0].uid, userName: user.displayName, workout: selectedWorkout.id });
  }, []);


  const complete = () => {
    socket.emit('completedExercise', { userId: user.providerData[0].uid, userName: user.displayName, workout: selectedWorkout.id})
    setCurrentExercise(currentExercise === selectedWorkout.exercises.length - 1 ? currentExercise : currentExercise + 1)
  }

  const makeReady = () => {
    setReady(true);
    socket.emit('ready', { userId: user.providerData[0].uid, workout: selectedWorkout.id})
  }

  const OtherUsers = Object.keys(roomStatus).length ? Object.keys(roomStatus[selectedWorkout.id])
    .filter(e => e !== user.providerData[0].uid)
    .map(user => (
      <Card>
        <Row>
          <Col>
            <Card.Img src={`https://robohash.org/${encodeURIComponent(roomStatus[selectedWorkout.id][user].name)}?set=set3`} />
            <Card.Text>{roomStatus[selectedWorkout.id][user].ready ? "Ready" : "Waiting"}</Card.Text>
          </Col>
          <Col>
            {roomStatus[selectedWorkout.id][user].progress.map((completed, i) => (
              // <Button variant={completed ? "primary" : "warning"} />
              <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} />
            ))}
          </Col>
        </Row>
      </Card>
    )) : <h2>No Other Users</h2>
  // console.log(otherUsers)
  console.log("room status")
  console.log(roomStatus)
  console.log(OtherUsers)
  // console.log(Boolean(Object.keys(roomStatus).length))

  const SelfProgress = Object.keys(roomStatus).length 
    ? roomStatus[selectedWorkout.id][user.providerData[0].uid].progress
      // .map((completed, i) => <Button variant={completed ? "primary" : "warning"} />) 
      .map((completed, i) => <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} />) 
    // : <Button variant="warning">Loading</Button>
    : <button type="button" className="btn btn-warning">Loading</button>

  const raceStatus = () => {
    if (!winner) {
      if (allReady) {
        return (
          <React.Fragment>
            <h1>GO!!!</h1>
            <h2>{selectedWorkout.exercises[currentExercise].name} x{selectedWorkout.exercises[currentExercise].reps}</h2>
            {/* <Button variant="primary" onClick={() => complete()}>Finished Exercise</Button> */}
            <button type="button" className="btn btn-primary" onClick={() => complete()}>Finished Exercise</button>
          </React.Fragment>
        );
      } else if (ready) {
        return (
          <React.Fragment>
            <h1>SET...</h1>
            {/* <Button variant="warning">...</Button> */}
            <button type="button" className="btn btn-warning">...</button>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <h1>READY?</h1>
            {/* <Button variant="danger" onClick={() => makeReady()}>I'm Ready!</Button> */}
            <button type="button" className="btn btn-danger" onClick={() => makeReady()}>I'm Ready!</button>
          </React.Fragment>
        );
      }
    } else {
      if (winner === user.providerData[0].uid) {
        return (
          <h1>YAY!!! YOU WIN!!!</h1>
        )
      } else {
        return (
          <h1>BOO!!! YOU LOSE!!!</h1>
        )
      }
    }
  }

  return (
    <div>
      {/* {otherUsers.length ? {OtherUsers} : <h2>No Other Users</h2> } */}
      {OtherUsers}
      {SelfProgress}
      {raceStatus()}
      {/* <h1>GO!!!</h1> */}
      {/* <Button variant="success" onClick={() => complete()}>Finished Exercise</Button> */}
    </div>
  )
}
import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RaceWorkout(props) {
  const { socket, user, selectedWorkout, leaveWorkout } = props;
  const [roomStatus, setRoomStatus] = useState({});
  const [winner, setWinner] = useState("");
  const [ready, setReady] = useState(false);
  const [allReady, setAllReady] = useState(false);

  socket.on('completedExercise', nameAndWorkout => {
    console.log('completed exercise')
    console.log(nameAndWorkout);
  });
  socket.on('roomStatus', status => {
    setRoomStatus(status);
    // console.log('room status')
    // console.log(roomStatus)
    // console.log(status)
  })
  useEffect(() => {
    socket.emit('joinWorkout', { userId: user.providerData[0].uid, userName: user.displayName, workout: selectedWorkout });
  }, []);


  // console.log(user.providerData[0].displayName)
  // console.log(user.providerData[0].uid)
  // socket.emit('joinWorkout', {userId: user.providerData[0].uid, userName: user.displayName, workout: selectedWorkout})
  console.log(selectedWorkout)
  const complete = () => {
    socket.emit('completedExercise', { userId: user.providerData[0].uid, userName: user.displayName, workout: selectedWorkout})
  }

  const otherUsers = Object.keys(roomStatus).length ? Object.keys(roomStatus[selectedWorkout])
    .filter(e => e !== user.providerData[0].uid) : []

  const OtherUsers = Object.keys(roomStatus).length ? Object.keys(roomStatus[selectedWorkout])
    .filter(e => e !== user.providerData[0].uid)
    .map(user => (
      <Card>
        <Row>
          <Col>
            <Card.Img src={`https://robohash.org/${encodeURIComponent(roomStatus[selectedWorkout][user].name)}?set=set3`} />
          </Col>
          <Col>
            {roomStatus[selectedWorkout][user].progress.map((completed, i) => (
              <Button variant={completed ? "primary" : "warning"} />
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

  const SelfProgress = Object.keys(roomStatus).length ?
    roomStatus[selectedWorkout][user.providerData[0].uid].progress.map((completed, i) => (
      <Button variant={completed ? "primary" : "warning"} />
    )) : <Button variant="warning">Loading</Button>

  const raceStatus = () => {
    if (!winner) {
      if (allReady) {
        return (
          <React.Fragment>
            <h1>GO!!!</h1>
            <Button variant="primary" onClick={() => complete()}>Finished Exercise</Button>
          </React.Fragment>
        );
      } else if (ready) {
        return (
          <React.Fragment>
            <h1>SET...</h1>
            <Button variant="warning">...</Button>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <h1>READY?</h1>
            <Button variant="danger" onClick={() => setReady(true)}>I'm Ready!</Button>
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
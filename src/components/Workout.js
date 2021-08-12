import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Workout(props) {
  const {
    pickWorkout,
    workout,
  } = props;

  const exercises = workout.exercises.map((e, i) => (
    <Row key={i}>
      <Col>
        <Card.Text>{e.name}</Card.Text>
      </Col>
      <Col>
        <Card.Text>{e.reps} Reps</Card.Text>
      </Col>
    </Row>
  ))

  return (
      <Card style={{ color: "black" }} className="m-2">
        <Card.Header>
          <Card.Title>{workout.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          {exercises}
        </Card.Body>
        <Card.Footer>
          {/* <Button id={workout.id} variant="success" onClick={(e) => pickWorkout(e.target.id)}>Join Workout</Button> */}
          <Button id={workout.id} variant="success" onClick={(e) => pickWorkout(workout)}>Join Workout</Button>
        </Card.Footer>
      </Card>
  )
}
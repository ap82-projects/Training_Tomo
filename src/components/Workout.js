import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Workout(props) {
  /* props.workout should have all the workout data as follows
  {
    id: (workout id)
    name: (Workout Name)
    available: (boolean false if active)
    exercises: [
      {
        name: (first exercise name)
        reps: (number of repetitions)
      },
      ...
      {
        name: (last exercise name)
        reps: (number of repetitions)
      }
    ]
  }
  */

  const exercises = props.workout.exercises.map((e, i) => (
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
          <Card.Title>{props.workout.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          {exercises}
        </Card.Body>
        <Card.Footer>
          <Button id={props.workout.id} variant="success" onClick={(e) => props.pickWorkout(e.target.id)}>Join Workout</Button>
        </Card.Footer>
      </Card>
  )
}
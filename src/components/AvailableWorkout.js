import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
// import "bootstrap/dist/css/bootstrap.min.cs";

export default function AvailableWorkout(props) {
  /* props.workout should have all the workout data as follows
  {
    id: (workout id)
    available: (boolean false if active)
    name: (Workout Name)
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

  const exercises = props.workout.exercises.map(e => (
    <Row>
      <Col>
        <Card.Text>{e.name}</Card.Text>
      </Col>
      <Col>
        <Card.Text>{e.reps}</Card.Text>
      </Col>
    </Row>
  ))

  return (
    // <div className="workout-selection">
      <Card style={{ color: "black" }} className="m-2">
        <Card.Header>
          <Card.Title>{props.workout.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text>Exercise</Card.Text>
            </Col>
            <Col>
              <Card.Text>Reps</Card.Text>
            </Col>
          </Row>
          {exercises}
        </Card.Body>
        <Card.Footer>
          <Button variant="success">Join Workout</Button>
        </Card.Footer>
      </Card>
    // </div>
  )
}
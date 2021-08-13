import React from "react"
// import Button from "react-bootstrap/Button"
// import Card from "react-bootstrap/Card"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"

export default function Workout(props) {
  const {
    pickWorkout,
    workout,
  } = props;

  const exercises = workout.exercises.map((e, i) => (
    <div className="row" key={i}>
      <div className="col">
        <p className="card-text">{e.name}</p>
      </div>
      <div className="col">
        <p className="card-text">{e.reps} Reps</p>
      </div>
    </div>
  ))

  return (
      <div className="card m-d" style={{ color: "black", width:"50%" }}>
        <div className="card-header">
          <h5 className="card-title">{workout.name}</h5>
        </div>
        <div className="card-body">
          {exercises}
        </div>
        <div className="card-footer">
          {/* <Button id={workout.id} variant="success" onClick={(e) => pickWorkout(e.target.id)}>Join Workout</Button> */}
          {/* <Button id={workout.id} variant="success" onClick={(e) => pickWorkout(workout)}>Join Workout</Button> */}
          <button id={workout.id} type="button" className="btn btn-success" onClick={(e) => pickWorkout(workout)}>Join Workout</button>
        </div>
      </div>
  )
}
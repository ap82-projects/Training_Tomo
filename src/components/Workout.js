import React from "react"

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
      <div className="Workout card m-d" style={{ color: "black", width:"50%" }}>
        <div className="card-header">
          <h5 className="card-title">{workout.name}</h5>
        </div>
        <div className="card-body">
          {exercises}
        </div>
        <div className="card-footer">
          <button id={workout.id} type="button" className="btn btn-success" onClick={(e) => pickWorkout(workout)}>Join Workout</button>
        </div>
      </div>
  )
}
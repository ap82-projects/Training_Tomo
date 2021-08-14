import React from "react"

export default function UserHeader(props) {
  const {
    user,
    auth,
    selectedWorkout,
    leaveWorkout,
    windowHeight
  } = props;

  const window20 = Math.floor(windowHeight * .2)
  return (
    <div className="UserHeader">
      <div className="card" style={{ color: "black", height: `${window20}px` }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col" style={{ height: "100%" }}>
            <img className="img-fluid"
              src={`https://robohash.org/${encodeURIComponent(user.displayName)}?set=set3`}
              style={{ height: "100%" }}
            />
          </div>
          <div className="col">
            <p className="card-text">Logged in as</p>
            <p className="card-text">{user.displayName}</p>
            {selectedWorkout ?
              <button type="button" className="btn btn-danger" onClick={() => leaveWorkout(selectedWorkout)}>Quit Workout</button> :
              <button type="button" className="btn btn-danger" onClick={() => auth.signOut()}>Sign Out</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
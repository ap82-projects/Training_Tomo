import React from "react"

export default function ChooseWorkout(props) {
  const { user, auth } = props;
  
  return (
    <div>
      <p>Hello { user.displayName }</p>
      <img src={`https://robohash.org/${encodeURIComponent(user.displayName)}`}></img>
      
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  )
}
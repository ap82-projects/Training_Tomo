import React from "react"
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function UserHeader(props) {
  const { user, auth } = props;
  
  
  return (
    <div>
      <p>Hello { user.displayName }</p>
      <img src={`https://robohash.org/${encodeURIComponent(user.displayName)}?set=set3`}></img>

      <Button variant="danger" onClick={() => auth.signOut()}>Sign Out</Button>
    </div>
  )
}
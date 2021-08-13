import React from "react"
// import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function UserHeader(props) {
  const { user, auth, selectedWorkout, leaveWorkout } = props;

  const windowHeight = window.innerHeight;
  const window20 = Math.floor(windowHeight * .2)
  return (
    <div className="UserHeader">
      <Card style={{ color: "black", height: `${window20}px` }}>
        <Row>
          <Col>
            <Card.Img src={`https://robohash.org/${encodeURIComponent(user.displayName)}?set=set3`} />
          </Col>
          <Col>
            <Card.Text>Logged in as</Card.Text>
            <Card.Text>{user.displayName}</Card.Text>
            {selectedWorkout ?
              // <Button variant="danger" onClick={() => leaveWorkout(selectedWorkout)}>Quit Workout</Button> :
              // <Button variant="danger" onClick={() => auth.signOut()}>Sign Out</Button>
              <button type="button" className="btn btn-danger" onClick={() => leaveWorkout(selectedWorkout)}>Quit Workout</button> :
              <button type="button" className="btn btn-danger" onClick={() => auth.signOut()}>Sign Out</button>
            }
          </Col>
        </Row>
      </Card>
    </div>
  )
}
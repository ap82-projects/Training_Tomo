import React, { useState, useEffect } from "react"

export default function RaceWorkout(props) {
  const {
    socket,
    user,
    selectedWorkout,
    windowHeight
  } = props;
  const [roomStatus, setRoomStatus] = useState({});
  const [winner, setWinner] = useState("");
  const [ready, setReady] = useState(false);
  const [allReady, setAllReady] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [hasOtherUsers, setHasOtherUsers] = useState(false);
  const [otherUsers, setOtherUsers] = useState(<h2>Loading</h2>);
  const [selfProgress, setSelfProgress] = useState(<button type="button" className="btn btn-warning">Loading Progress Bar</button>)
  // console.log("selectedWorkout")
  // console.log(selectedWorkout)
  
  // socket.on('completedExercise', nameAndWorkout => {
  //   console.log('completed exercise')
  //   console.log(nameAndWorkout);
  // });
  // socket.on('roomStatus', status => {
  //   setRoomStatus(status);
  //   console.log('room status')
  //   console.log(status)
  // });
  // socket.on('allReady', ready => {
  //   setAllReady(true);
  // });
  // socket.on('winner', user => {
  //   setWinner(user);
  // })
  
  useEffect(() => {
    console.log("selectedWorkout")
    console.log(selectedWorkout)

    socket.emit('joinWorkout', { userId: user.providerData[0].uid, userName: user.displayName, workout: selectedWorkout.id });

    socket.on('completedExercise', nameAndWorkout => {
      console.log('completed exercise')
      console.log(nameAndWorkout);
    });
    socket.on('roomStatus', status => {
      setRoomStatus(status);
      console.log('room status')
      console.log(status)
    });
    socket.on('allReady', ready => {
      setAllReady(true);
    });
    socket.on('winner', user => {
      setWinner(user);
    })
  }, []);

  useEffect(() => {
    console.log("room status in useEffect")
    console.log(roomStatus)
    if (roomStatus[selectedWorkout.id]) {
      const usersInRoom = Object.keys(roomStatus[selectedWorkout.id]);
      const hasOtherUsers = usersInRoom.length > 1;
      setHasOtherUsers(hasOtherUsers)
      setOtherUsers(hasOtherUsers
        ? usersInRoom
          .filter(e => e !== user.providerData[0].uid)
          .map(user => (
            <div className="card-sm shadow-sm" style={{ height: `${windowHeight * .15}px` }} key={user}>
              <img className="img-fluid"
                style={{ height: "75%" }}
                src={`https://robohash.org/${encodeURIComponent(roomStatus[selectedWorkout.id][user].name)}?set=set3`}
              />
              {roomStatus[selectedWorkout.id][user].progress.map((completed, i) => (
                <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} key={i} />
              ))}
              <p className="card-text">{roomStatus[selectedWorkout.id][user].ready ? "Ready" : "Waiting"}</p>
            </div>
          ))
        : <h2>Waiting For Other Users</h2>
      );

      setSelfProgress(Object.keys(roomStatus).length
        ? roomStatus[selectedWorkout.id][user.providerData[0].uid].progress
          .map((completed, i) => <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} />)
        : <button type="button" className="btn btn-warning">Loading Progress Bar</button>
      )
    }
    // setOtherUsers(roomStatus[selectedWorkout.id] && Object.keys(roomStatus[selectedWorkout.id]).length > 1
    //   ? Object.keys(roomStatus[selectedWorkout.id])
    //     .filter(e => e !== user.providerData[0].uid)
    //     .map(user => (
    //       <div className="card-sm shadow-sm" style={{ height: `${windowHeight * .15}px` }} key={user}>
    //         <img className="img-fluid"
    //           style={{ height: "75%" }}
    //           src={`https://robohash.org/${encodeURIComponent(roomStatus[selectedWorkout.id][user].name)}?set=set3`}
    //         />
    //         {roomStatus[selectedWorkout.id][user].progress.map((completed, i) => (
    //           <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} key={i} />
    //         ))}
    //         <p className="card-text">{roomStatus[selectedWorkout.id][user].ready ? "Ready" : "Waiting"}</p>
    //       </div>
    //     ))
    //   : <h2>Waiting For Other Users</h2>
    // )

    // setSelfProgress(Object.keys(roomStatus).length
    //   ? roomStatus[selectedWorkout.id][user.providerData[0].uid].progress
    //     .map((completed, i) => <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} />)
    //   : <button type="button" className="btn btn-warning">Loading Progress Bar</button>
    // )
  }, [roomStatus])


  const complete = () => {
    socket.emit('completedExercise', { userId: user.providerData[0].uid, userName: user.displayName, workout: selectedWorkout.id })
    setCurrentExercise(currentExercise === selectedWorkout.exercises.length - 1 ? currentExercise : currentExercise + 1)
  }

  const makeReady = () => {
    setReady(true);
    socket.emit('ready', { userId: user.providerData[0].uid, workout: selectedWorkout.id })
  }

  // const OtherUsers = Object.keys(roomStatus).length ? Object.keys(roomStatus[selectedWorkout.id])
  //   // .filter(e => e !== user.providerData[0].uid)
  //   .filter(e => {
  //     console.log('e')
  //     console.log(e)
  //     console.log('user uid')
  //     console.log(user.providerData[0].uid)
  //     console.log('to return: ', e !== user.providerData[0].uid)
  //     console.log('user')
  //     console.log(user)
  //     return e !== user.providerData[0].uid
  //   })
  //   .map(user => (
  //     <div className="card-sm shadow-sm" style={{ height: `${windowHeight * .1}px` }} key={user}>
  //           <img className="img-fluid"
  //             style={{ height: "75%" }}
  //             src={`https://robohash.org/${encodeURIComponent(roomStatus[selectedWorkout.id][user].name)}?set=set3`}
  //           />
  //           {roomStatus[selectedWorkout.id][user].progress.map((completed, i) => (
  //             <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} key={i} />
  //           ))}
  //           <p className="card-text">{roomStatus[selectedWorkout.id][user].ready ? "Ready" : "Waiting"}</p>
  //     </div>
  //   )) : <h2>No Other Users</h2>
  // console.log(otherUsers)
  console.log("room status")
  console.log(roomStatus)
  console.log("other users")
  // console.log(OtherUsers)
  console.log(otherUsers)
  // console.log(Boolean(Object.keys(roomStatus).length))

  const SelfProgress = Object.keys(roomStatus).length
    ? roomStatus[selectedWorkout.id][user.providerData[0].uid].progress
      .map((completed, i) => <button type="button" className={`btn btn-${completed ? "primary" : "warning"}`} />)
    : <button type="button" className="btn btn-warning">Loading</button>

  const raceStatus = () => {
    if (!winner) {
      if (allReady) {
        return (
          <React.Fragment>
            <h1>GO!!!</h1>
            <h2>{selectedWorkout.exercises[currentExercise].name} x{selectedWorkout.exercises[currentExercise].reps}</h2>
            <button type="button" className="btn btn-primary" onClick={() => complete()}>Finished Exercise</button>
          </React.Fragment>
        );
      } else if (ready) {
        return (
          <React.Fragment>
            <h1>SET...</h1>
            <button type="button" className="btn btn-warning">...</button>
          </React.Fragment>
        );
      } else if (hasOtherUsers) {
        return (
          <React.Fragment>
            <h1>READY?</h1>
            <button type="button" className="btn btn-danger" onClick={() => makeReady()}>I'm Ready!</button>
          </React.Fragment>
        );
      } else {
        return (
          <></>
        )
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
    <div className="RaceWorkout">
      {/* {OtherUsers} */}
      {otherUsers}
      {raceStatus()}
      <div>
        {/* {SelfProgress} */}
        {selfProgress}
      </div>
    </div>
  )
}
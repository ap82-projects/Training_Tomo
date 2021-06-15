import React, { useState } from "react"
// import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'
import UserHeader from './UserHeader';
// import AvailableWorkout from './AvailableWorkout';
import ChooseWorkout from './ChooseWorkout';
import RaceWorkout from './RaceWorkout';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function WorkoutHome(props) {
  const { user, auth, firestore } = props;
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const getWorkout = workoutId => {
    setSelectedWorkout(workoutId);
    console.log(selectedWorkout)
  }


  return (
    // <div>
    <React.Fragment>
      <UserHeader auth={auth} user={user} />
      {selectedWorkout ? <RaceWorkout getWorkout={getWorkout} /> : <ChooseWorkout getWorkout={getWorkout} />}
    </React.Fragment>
    // </div>
  )
}


// const workoutRefs = firestore.collection('workouts');
// console.log(firestore)

// const workoutRef = firestore.collection('workouts');
// console.log(workoutRef)
// const query = workoutRef.orderBy('available');
// // console.log(query)
// const [workouts] = useCollectionData(query, {idfield: 'id'})
// console.log(workouts)
// workoutRef.add({
  //   id: "000",
  //   name: "Workout 1",
  //   available: true,
  //   exercises: [
    //     {
      //       name: "Exercise 1",
      //       reps: 10
      //     },
      //     {
        //       name: "Exercise 2",
        //       reps: 20
        //     },
        //     {
          //       name: "Exercise 3",
          //       reps: 30
          //     }
          //   ]
          // })







          // const testWorkouts = [
            //   {
              //     id: "000",
              //     name: "Workout 1",
              //     available: true,
              //     exercises: [
                //       {
                  //         name: "Exercise 1",
                  //         reps: 10
                  //       },
                  //       {
                    //         name: "Exercise 2",
                    //         reps: 20
                    //       },
                    //       {
                      //         name: "Exercise 3",
                      //         reps: 30
                      //       }
                      //     ]
                      //   },
                      //   {
                        //     id: "001",
                        //     name: "Workout 2",
                        //     available: false,
                        //     exercises: [
                          //       {
                            //         name: "Exercise 4",
                            //         reps: 15
                            //       },
                            //       {
                              //         name: "Exercise 5",
                              //         reps: 25
                              //       },
                              //       {
                                //         name: "Exercise 6",
                                //         reps: 35
                                //       },
                                //       {
                                  //         name: "Exercise 7",
                                  //         reps: 35
                                  //       }
                                  //     ]
                                  //   },
                                  //   {
                                    //     id: "002",
                                    //     name: "Workout 3",
                                    //     available: true,
                                    //     exercises: [
                                      //       {
                                        //         name: "Exercise 8",
                                        //         reps: 18
                                        //       },
                                        //       {
                                          //         name: "Exercise 9",
                                          //         reps: 27
                                          //       },
                                          //       {
                                            //         name: "Exercise 10",
                                            //         reps: 39
                                            //       },
                                            //       {
                                              //         name: "Exercise 11",
                                              //         reps: 24
                                              //       },
                                              //       {
                                                //         name: "Exercise 12",
                                                //         reps: 32
                                                //       }
                                                //     ]
                                                //   }
                                                // ]

                                                // const availableWorkouts = testWorkouts
                                                //   .filter(e => e.available)
                                                //   .map(e => (
                                                  //     <AvailableWorkout getWorkout={getWorkout} workout={e} key={e.id}/>
                                                  //   ))
                                                  // const ChooseWorkout = (
                                                  //   <div>
                                                  //       <h3>Available Workouts</h3>
                                                  //       {availableWorkouts}
                                                  //   </div>
                                                  // )
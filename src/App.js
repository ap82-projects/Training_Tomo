import React, { useState } from 'react';
import './App.css';
import WorkoutHome from './components/WorkoutHome';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAxWR-ulnK5Q4ipQNZ2RbjqmkY1QADeWmo",
  authDomain: "training-tomo.firebaseapp.com",
  projectId: "training-tomo",
  storageBucket: "training-tomo.appspot.com",
  messagingSenderId: "891311506929",
  appId: "1:891311506929:web:80c541f38899087720f050"
});

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <section>
        {user ? <WorkoutHome user={user} auth={auth} firestore={firestore}/> : <SignIn />}
      </section>
      {/* </header> */}
    </div>
  );
}

function SignIn() {
  console.log("sign in")
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export default App;

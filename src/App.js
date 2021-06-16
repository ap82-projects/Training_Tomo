import React, { useState } from 'react';
import './App.css';
import WorkoutHome from './components/WorkoutHome';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import io from 'socket.io-client';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
require('dotenv').config();
console.log('pre')
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});
console.log('post')
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

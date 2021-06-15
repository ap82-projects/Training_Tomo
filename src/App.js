import React from 'react';
import './App.css';
import ChooseWorkout from './components/ChooseWorkout';
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
// const firestore = firebase.firestore();


function App() {
  console.log("app")
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
      <section>
        {/* {user ? <SignOut usr={user}/> : <SignIn />} */}
        {user ? <ChooseWorkout user={user} auth={auth}/> : <SignIn />}
      </section>
        
      </header>

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

function SignOut(props) {
  console.log(props.usr)
  console.log(auth.currentUser)
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out {props.usr.displayName}</button>
  )
}

export default App;

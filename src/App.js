import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  // const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(displayName, email, photoURL)
    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false, 
        name: '',
        photo: '',
        email: ''
      }
      setUser(signOutUser);
    })
    .catch(err => {
      
    })
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> : <button onClick={handleSignIn}>Sign In</button>
      }
       {
         user.isSignedIn && <div>
           <p>Welcome, {user.name}</p>
           <p>Your Email: {user.email}</p>
           <img src={user.photo} alt="" />
           </div>
       }
    </div>
  );
}

export default App;

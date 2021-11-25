import { useState, useEffect, useRef } from "react";
import styles from './Login.module.css';
import { GoogleLogin, useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
// import {
//   getAuth,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
// } from 'firebase/auth';
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   onSnapshot,
//   setDoc,
//   updateDoc,
//   doc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from 'firebase/storage';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { getPerformance } from 'firebase/performance';
// import { initializeApp } from 'firebase/app';


// const firebaseConfig = {
//   apiKey: "AIzaSyBvHmpAhVEdzRjq_vjMCSMkgGivvO65ZQg",
//   authDomain: "grounded-vista-290601.firebaseapp.com",
//   databaseURL: "https://grounded-vista-290601.firebaseio.com",
//   projectId: "grounded-vista-290601",
//   storageBucket: "grounded-vista-290601.appspot.com",
//   messagingSenderId: "48114335195",
//   appId: "1:48114335195:web:6561b83006678763907bfe"
// };

// const firebaseAppConfig = firebaseConfig;
// initializeApp(firebaseConfig);


const Login = () => {

  // async function signIn() {
  //   // Sign in Firebase using popup auth and Google as the identity provider.
  //   const provider = new GoogleAuthProvider();
  //   await signInWithPopup(getAuth(), provider);
  //   console.log("sig in ");
  //   navigate('/app');
  // }

  // Signs-out of Friendly Chat.
  // function signOutUser() {
  //   // Sign out of Firebase.
  //   signOut(getAuth());
  // }
  // function initFirebaseAuth() {
  //   // Listen to auth state changes.
  //   onAuthStateChanged(getAuth(), authStateObserver);
  // }

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();

  const onLoginSuccess = (res) => {
    console.log("succes response: ", res);
    navigate('/app');
  }


  const onLoginFailure = (res) => {
    console.log("failrue response: ", res);
  }

  // const { signIn, loaded } = useGoogleLogin({
  //   clientId,
  //   onSuccess: onLoginSuccess,
  //   onFailure: onLoginFailure,
  //   cookiePolicy: 'single_host_origin',
  // })

  return (

    <div className={styles.container}>

      <div className={styles.login}>
        <div className={styles.header}>
          <img className={styles.img} src={"./images/logo.png"} alt="wait" />
          <h1>
            Business Card Maker
          </h1>
        </div>
        <div className={styles.method}>
          <h3>Login</h3>
          <div className={styles.btns}>
            <button className={styles.button}>Google</button>
            <button className={styles.button}>Github</button>
          </div>
        </div>
        <div className={styles.footer}>
          <h5>Code your dream</h5>
        </div>
      </div>
    </div >
  )
};


export default Login;
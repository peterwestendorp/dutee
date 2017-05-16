import * as firebase from 'firebase';
import * as firebaseUI from 'firebaseui';
import { startApp } from './app';

let loggedInUser: any;

export let getLoggedInUser = () => loggedInUser;

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDWUuggqMPPlcsc6ez_4IZFRJxFMhckBYU",
  authDomain: "dutee.firebaseapp.com",
  databaseURL: "https://dutee.firebaseio.com",
  projectId: "firebase-dutee",
  storageBucket: "firebase-dutee.appspot.com",
  messagingSenderId: "467628975171"
});

// Initialize the FirebaseUI Widget using Firebase.
let firebaseAuthUI = new firebaseUI.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
firebaseAuthUI.start('#appContainer', {
  signInSuccessUrl: '/',
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
});

let initApp = () => {
  firebase.auth().onAuthStateChanged((user: any) => {
    if (user) {
      // User is signed in.
      loggedInUser = user;

      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let uid = user.uid;
      let providerData = user.providerData;

      user.getToken().then((accessToken: any) => {
        startApp();
        // document.getElementById('account-details').textContent = JSON.stringify({
        //   displayName: displayName,
        //   email: email,
        //   emailVerified: emailVerified,
        //   photoURL: photoURL,
        //   uid: uid,
        //   accessToken: accessToken,
        //   providerData: providerData
        // }, null, '  ');  
      });
    } else {
      // User is signed out.
    }
  }, (error: any) => {
    console.log(error);
  });
};

window.addEventListener('DOMContentLoaded', initApp);
import * as firebase from 'firebase';
import { startApp } from './app';
import { createAuthenticationService } from './authenticationService';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDWUuggqMPPlcsc6ez_4IZFRJxFMhckBYU",
  authDomain: "dutee.firebaseapp.com",
  databaseURL: "https://dutee.firebaseio.com",
  projectId: "firebase-dutee",
  storageBucket: "firebase-dutee.appspot.com",
  messagingSenderId: "467628975171"
});

export let authenticationService = createAuthenticationService();

window.addEventListener('DOMContentLoaded', () => {
  authenticationService.initialize(startApp);
});
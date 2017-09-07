import * as firebase from 'firebase';
import { startApp } from './app';
import { createProjector} from 'maquette';
import { createAuthenticationService } from './services/authenticationService';
import { createDatabaseService } from './services/databaseService';

firebase.initializeApp({
  apiKey: "AIzaSyDWUuggqMPPlcsc6ez_4IZFRJxFMhckBYU",
  authDomain: "dutee.firebaseapp.com",
  databaseURL: "https://dutee.firebaseio.com",
  projectId: "firebase-dutee",
  storageBucket: "firebase-dutee.appspot.com",
  messagingSenderId: "467628975171"
});

window.addEventListener('DOMContentLoaded', () => {
  let projector = createProjector();
  let authenticationService = createAuthenticationService(projector);
  let databaseService = createDatabaseService();

  startApp({
    window,
    projector,
    services: {
      authenticationService,
      databaseService
    }
  });
});
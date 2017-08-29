import * as firebase from 'firebase';
import { startApp } from './app';
import { createProjector} from 'maquette';
import { createAuthenticationService } from './services/authenticationService';
import { createDatabaseService } from './services/databaseService';
import { AppContext } from './app';

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
    projector,
    services: {
      authenticationService,
      databaseService
    }
  });
});
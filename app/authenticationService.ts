import * as firebase from 'firebase';
import * as firebaseUI from 'firebaseui';

let createAuthenticationService = () => {
  let loggedInUser: any;

  let getLoggedInUser = () => {
    console.log('loggedInUser', loggedInUser);
    return loggedInUser;
  };
  let logout = () => firebase.auth().signOut();

  let initialize = (callback: Function) => {
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
          callback();
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
        loggedInUser = undefined;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  return {
    initialize,
    getLoggedInUser,
    logout
  }
};



export { createAuthenticationService };
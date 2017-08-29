import * as firebase from 'firebase';
import { h, VNode, Projector } from 'maquette';

export interface AuthenticationService {
  render(): VNode;
  getCurrentUser(): any;
}

let createAuthenticationService = (projector: Projector): AuthenticationService => {
  let loggedInUser: any = undefined;
  let facebookProvider = new firebase.auth.FacebookAuthProvider();

  let signIn = () => {
    firebase.auth().signInWithRedirect(facebookProvider).then((result: any) => {
      if (result.user) {
        loggedInUser = result.user;
        projector.scheduleRender();
      } else {
        loggedInUser = undefined;
        console.log('No user found');
      }
    }).catch((error: any) => {
      console.error(error);
      loggedInUser = undefined;
    });
  };

  let signOut = () => {
    firebase.auth().signOut().then(() => {
      loggedInUser = undefined;
      projector.scheduleRender();
    }).catch(console.error);
  };

  let getCurrentUser = () => loggedInUser;

  firebase.auth().onAuthStateChanged((user: any) => {
    if (user) {
      loggedInUser = user;
      projector.scheduleRender();
    } else {
      console.log('User logged out');
      loggedInUser = undefined;
    }
  });

  let render = () => {
    let signedIn = getCurrentUser() !== undefined;

    return h('div.authenticationService', [
      !signedIn ? h('button', { key: 'signInButton', onclick: signIn }, 'Sign in with Facebook') : [],
      signedIn ? h('button', { key: 'signOutButton', onclick: signOut }, 'Sign out') : []
    ]);
  };

  return {
    render,
    getCurrentUser
  };
};

export { createAuthenticationService };
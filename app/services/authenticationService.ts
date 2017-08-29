import * as firebase from 'firebase';
import { h, VNode, Projector } from 'maquette';

export interface AuthenticationService {
  render(): VNode;
  getCurrentUser(): any;
}

let createAuthenticationService = (projector: Projector): AuthenticationService => {
  let loggedInUser: any;
  let facebookProvider: any;

  let signIn = () => {
    firebase.auth().signInWithPopup(facebookProvider).then((result: any) => {
      loggedInUser = result.user;
      projector.scheduleRender();
    }).catch((error: any) => {
      console.error(error);
      loggedInUser = undefined;
    });
  };

  let signOut = () => {
    firebase.auth().signOut();
    loggedInUser = undefined;
  };

  let getCurrentUser = () => loggedInUser;

  let handleAfterCreate = () => {
    facebookProvider = new firebase.auth.FacebookAuthProvider();
  };

  let render = () => {
    let signedIn = !!getCurrentUser();

    return h('div.authenticationService', {
      afterCreate: handleAfterCreate
    }, [
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
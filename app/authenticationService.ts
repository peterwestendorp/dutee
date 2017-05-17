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
    return h('div.authenticationService', {
      afterCreate: handleAfterCreate
    }, [
      !getCurrentUser() ? h('button', { onclick: signIn }, 'Sign in with Facebook') : undefined,
      getCurrentUser() ? h('button', { onclick: signOut }, 'Sign out') : undefined
    ]);
  };

  return {
    render,
    getCurrentUser
  }
};

export { createAuthenticationService };
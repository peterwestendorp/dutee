/* tslint:disable no-console */
import * as firebase from 'firebase';

export interface IDatabaseService {
  get(): void;
  set(ref: string, data: Object): Promise<any>;
}

let createDatabaseService = (): IDatabaseService => {
  let firebaseDB = firebase.database();

  let get = () => {};

  let set = (ref: string, data: object): Promise<any> => {
    console.log('setting', ref, data);
    return firebase.database().ref(`${ref}`).set(data);
  };

  return { get, set };
};

export { createDatabaseService };

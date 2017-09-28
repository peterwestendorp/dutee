/* tslint:disable no-console */
import * as firebase from 'firebase';

export interface DatabaseService {
  get(): void;
  set(ref: string, data: Object): firebase.Promise<any>;
}

let createDatabaseService = (): DatabaseService => {
  let firebaseDB = firebase.database();

  let get = () => {};

  let set = (ref: string, value: string): firebase.Promise<any> => {
    let data: any = {};
    data[value] = true;

    console.log('setting', ref, data);
    return firebase.database().ref(`${ref}`).set(data);
  };

  return { get, set };
};

export { createDatabaseService };

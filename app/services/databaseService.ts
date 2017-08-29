import * as firebase from 'firebase';

export interface DatabaseService {

};

let createDatabaseService = (): DatabaseService => {
  let firebaseDB = firebase.database();

  let get = () => {};

  let set = (ref: string, data: Object): firebase.Promise<any> => {
    return firebase.database().ref(ref).set(data);
  };

  return { get, set };
};

export { createDatabaseService };

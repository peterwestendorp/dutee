export interface Person {
  name: string;
}

let getPerson = (person: Person): void => {
  console.log(person.name);
}

getPerson({name: 'henk'});
export interface InputConfig {
  id: string;
  label: string;
  save(value: string): firebase.Promise<any>;
}
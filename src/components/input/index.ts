import { Services } from '../../app';

export interface IInputConfig {
  id: string;
  label: string;
  services: Services;
  databasePath: string;
}
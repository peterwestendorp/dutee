import { Services } from '../../app';

export interface InputConfig {
  id: string;
  label: string;
  services: Services;
  databasePath: string;
}
import { Services } from '../../app';

export interface IInputConfig<T> {
  id: string;
  label: string;
  services: Services;
  update(newValue: T): void;
}
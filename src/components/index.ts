import { VNode } from 'maquette';

export interface IComponent {
  render(): VNode | undefined;
}
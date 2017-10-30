import { VNode } from 'maquette';

export interface IComponent {
  render(): VNode | undefined;
}

export interface IComponentConfig {
  databasePath: string;
}

export class Component implements IComponent {
  protected databasePath: string;

  constructor(config: IComponentConfig) {
    this.databasePath = config.databasePath;
  }

  render(): VNode | undefined {
    return undefined;
  }
}
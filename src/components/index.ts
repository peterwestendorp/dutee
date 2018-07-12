import { VNode } from 'maquette';

export interface IComponent {
  render(): VNode | undefined;
}

export interface IValueComponentConfig<T> {
  update(newValue: T): void;
}

export class ValueComponent<T> implements IComponent {
  protected update: (newValue: T) => void;

  constructor(config: IValueComponentConfig<T>) {
    this.update = config.update;
  }

  render(): VNode | undefined {
    return undefined;
  }
}
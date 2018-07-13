import { VNode } from 'maquette';

export interface IModelConfig<T> {
  id: string;
}

export interface IModel<T> {
  getValue(): T | undefined;
  setValue(newValue: T): void;
}

export class Model<T> implements IModel<T> {
  public id: string;
  private _value: T | undefined = undefined;

  constructor(config: IModelConfig<T>) {
    this.id = config.id;
  }

  getValue(): T | undefined {
    return this._value;
  }

  setValue(newValue: T): void {
    this._value = newValue;
  }
}
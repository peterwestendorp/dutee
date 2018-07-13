import { h } from 'maquette';
import { IInputConfig } from './index';
import { ValueComponent } from '../value-component';

export interface ITodoItemComponentConfig<T> {
  id: string;
  getCurrentValue(): T,
  update(newValue: T): void;
}

export class TodoItemComponent extends ValueComponent<string> {
  private element: HTMLElement;
  private id: string;
  private currentValue: string;
  protected update: any;

  constructor(config: ITodoItemComponentConfig<string>) {
    super(config);
    this.id = config.id;
    this.currentValue = config.getCurrentValue();
    this.update = config.update;
  }

  handleAfterCreate(element: HTMLInputElement): void {
    this.element = element;
  }

  handleKeyDown(evt: KeyboardEvent): void {
    console.log(evt.which);

    if(evt.which === 13) {
      evt.preventDefault();
      this.update(this.currentValue);
    } else {
      this.currentValue = this.element.innerText;
    }
  }

  render() {
    return h('li', {
      bind: this,
      key: this.id,
      classes: {
        'todoItem': true
      },
      afterCreate: this.handleAfterCreate,
      onkeydown: this.handleKeyDown,
      'contenteditable': 'true'
    }, [
      this.currentValue
    ]);
  }
}
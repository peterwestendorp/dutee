import { h } from 'maquette';
import { IInputConfig } from './index';
import { ValueComponent } from '../value-component';

export class TextInput extends ValueComponent<string> {
  private inputElement: HTMLInputElement;
  private id: string;
  private label: string;

  constructor(config: IInputConfig<string>) {
    super(config);
    this.id = config.id;
    this.label = config.label;
  }

  handleAfterCreate(element: HTMLInputElement): void {
    this.inputElement = element;
  }

  handleInput(evt: Event): void {
    this.update(this.inputElement.value);
  }

  render() {
    return h('label', { key: this.id }, [
      this.label,
      h('input', {
        bind: this,
        type: 'text',
        afterCreate: this.handleAfterCreate,
        oninput: this.handleInput
      })
    ]);
  }
}
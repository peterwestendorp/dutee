import { h, VNode } from 'maquette';
import { InputConfig } from './index';
import { errorHandler } from '../../utilities/error-handler';

export class TextInput {
  private inputElement: HTMLInputElement;
  private id: string;
  private label: string;
  private save: (value: string) => firebase.Promise<any>;

  constructor(config: InputConfig) {
    this.id = config.id;
    this.label = config.label;
    this.save = config.save;
  }

  handleAfterCreate(element: HTMLInputElement): void {
    this.inputElement = element;
  }

  handleInput(evt: Event): void {
    this.save(this.inputElement!.value).catch(errorHandler);
  }

  render(): VNode {
    return h('label', { key: this.id }, [
      this.label,
      h('input', {
        type: 'text',
        afterCreate: this.handleAfterCreate,
        oninput: this.handleInput
      })
    ]);
  }
}
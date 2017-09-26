import { h, VNode } from 'maquette';
import { InputConfig } from './index';
import { DatabaseService } from '../../services/databaseService';
import { errorHandler } from '../../utilities/error-handler';

export class DateInput {
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
    return h('label', {
      bind: this,
      key: this.id
    }, [
      this.label,
      h('input', {
        type: 'date',
        afterCreate: this.handleAfterCreate,
        oninput: this.handleInput
      })
    ]);
  }
}
import { h, VNode } from 'maquette';
import { InputConfig } from './index';
import { DatabaseService } from '../../services/databaseService';

export class DateInput {
  private inputElement: HTMLInputElement;
  private id: string;
  private label: string;
  private databaseService: DatabaseService;

  constructor(config: InputConfig) {
    this.id = config.id;
    this.label = config.label;
    this.databaseService = config.databaseService;
  }

  handleAfterCreate(element: HTMLInputElement): void {
    this.inputElement = element;
  }

  handleInput(evt: Event): void {
    this.save(this.inputElement!.value);
  }

  save(value: string) {
    let data: any = {};
    data[value] = true;
    return this.databaseService.set('/dates', data);
  }

  render(): VNode {
    return h('label', { key: this.id }, [
      this.label,
      h('input', {
        type: 'date',
        afterCreate: this.handleAfterCreate,
        oninput: this.handleInput
      })
    ]);
  }
}
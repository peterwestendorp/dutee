import { h, VNode } from 'maquette';
import { InputConfig } from './index';
import { errorHandler } from '../../utilities/error-handler';
import { Services } from '../../app';

export class TextInput {
  private inputElement: HTMLInputElement;
  private id: string;
  private label: string;
  private services: Services;
  private databasePath: string;

  constructor(config: InputConfig) {
    this.id = config.id;
    this.label = config.label;
    this.services = config.services;
    this.databasePath = config.databasePath;
  }

  handleAfterCreate(element: HTMLInputElement): void {
    this.inputElement = element;
  }

  handleInput(evt: Event): void {
    this.services.databaseService.set(this.databasePath, this.inputElement!.value).catch(errorHandler);
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
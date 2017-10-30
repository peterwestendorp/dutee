import { h } from 'maquette';
import { IInputConfig } from './index';
import { errorHandler } from '../../utilities/error-handler';
import { Services } from '../../app';
import { Component } from '../index';

export class TextInput extends Component {
  private inputElement: HTMLInputElement;
  private id: string;
  private label: string;
  private services: Services;

  constructor(config: IInputConfig) {
    super(config);
    this.id = config.id;
    this.label = config.label;
    this.services = config.services;
  }

  handleAfterCreate(element: HTMLInputElement): void {
    this.inputElement = element;
  }

  handleInput(evt: Event): void {
    this.services.databaseService.set(this.databasePath, this.inputElement!.value).catch(errorHandler);
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
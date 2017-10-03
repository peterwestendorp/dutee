import { h, VNode } from 'maquette';
import { IInputConfig } from './index';
import { errorHandler } from '../../utilities/error-handler';
import { Services } from '../../app';
import { IComponent } from '../index';

export class DateInput implements IComponent {
  private inputElement: HTMLInputElement;
  private id: string;
  private label: string;
  private services: Services;
  private databasePath: string;

  constructor(config: IInputConfig) {
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
    return h('label', {
      bind: this,
      key: this.id
    }, [
      this.label,
      h('input', {
        bind: this,
        type: 'date',
        afterCreate: this.handleAfterCreate,
        oninput: this.handleInput
      })
    ]);
  }
}
import { h, VNode } from 'maquette';
import { Services } from '../app';
import { TextInput } from '../components/input/text-input-component';
import { IComponent } from '../components/index';
import { IPage } from './index';
import { Button } from '../components/button/button';
import { DateInput } from '../components/input/date-input-component';

export class RosterPage implements IPage {
  private nameInput: IComponent;
  private dateInput: IComponent;
  private submitButton: IComponent;
  private services: Services;

  constructor(services: Services) {
    this.services = services;

    this.nameInput = new TextInput({
      id: 'rosterNameField',
      label: 'Roster name',
      services,
      databasePath: '/rosters'
    });

    this.dateInput = new DateInput({
      id: 'rosterNameField',
      label: 'Roster name',
      services,
      databasePath: '/rosters'
    });

    this.submitButton = new Button({
      name: 'submit',
      databasePath: '/rosters'
    });
  }

  render(): VNode {
    return h('div', [
      this.nameInput.render(),
      this.submitButton.render(),
      this.dateInput.render()
    ]);
  }
}
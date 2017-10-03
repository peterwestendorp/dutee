import { VNode } from 'maquette';
import { Services } from '../app';
import { TextInput } from '../components/input/text-input-component';
import { IComponent } from '../components/index';
import { IPage } from './index';

export class RosterPage implements IPage {
  private nameInput: IComponent;
  private services: Services;

  constructor(services: Services) {
    this.services = services;

    this.nameInput = new TextInput({
      id: 'rosterNameField',
      label: 'Roster name',
      services,
      databasePath: '/rosters'
    })
  }

  render(): VNode {
    return this.nameInput.render();
  }
}
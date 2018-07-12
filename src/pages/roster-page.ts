import { h, VNode } from 'maquette';
import { Services } from '../app';
import { TextInput } from '../components/input/text-input-component';
import { IComponent } from '../components/index';
import { IPage } from './index';
import { Button } from '../components/button/button';
import { DateInput } from '../components/input/date-input-component';
import { errorHandler } from '../utilities/error-handler';

export class RosterPage implements IPage {
  private nameInput: IComponent;
  private dateInput: IComponent;
  private submitButton: IComponent;
  private services: Services;

  constructor(services: Services, model: any) {
    this.services = services;

    this.nameInput = new TextInput({
      id: 'rosterNameField',
      label: 'Roster name',
      services,
      update: (newValue: string) => {
        model.name = newValue;
      }
    });

    this.dateInput = new DateInput({
      id: 'rosterDateField',
      label: 'Roster date',
      services,
      update: (newValue: string) => {
        model.date = newValue;
      }
    });

    this.submitButton = new Button({
      name: 'submit',
      action: () => {
        let currentUser = services.authenticationService.getCurrentUser();
        this.services.databaseService.set(`/rosters/${currentUser.uid}`, model).catch(errorHandler);
      }
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
import { h, Projector } from 'maquette';
import { AuthenticationService } from './services/authenticationService';
import { DatabaseService } from './services/databaseService';
import { DateInput } from './components/inputs/date-input';
import { TextInput } from './components/inputs/text-input';

export interface AppContext {
  window: Window;
  projector: Projector;
  services: {
    authenticationService: AuthenticationService;
    databaseService: DatabaseService;
  };
}

let startApp = (appContext: AppContext) => {
  let {
    window,
    projector,
    services
  } = appContext;
  let appContainer = window.document.getElementById('appContainer');

  let dateField = new DateInput({
    id: 'roster-date',
    label: 'Datum',
    save: (value: string) => {
      let data: any = {};
      data[value] = true;
      return services.databaseService.set('/rosters', data);
    }
  });

  let titleField = new TextInput({
    id: 'roster-title',
    label: 'Rooster titel',
    save: (value: string) => {
      let data: any = {};
      data[value] = true;
      return services.databaseService.set('/rosters', data);
    }
  });

  if (appContainer !== null) {
    projector.append(appContainer, () => h('div.app', [
      services.authenticationService.render(),
      !!services.authenticationService.getCurrentUser() ? h('div', [titleField.render(), dateField.render()]) : []
    ]));
  }
};

export { startApp };

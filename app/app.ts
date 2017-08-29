import { h, Projector } from 'maquette';
import { AuthenticationService } from './services/authenticationService';
import { DatabaseService } from './services/databaseService';
import { createDateInput } from './components/inputs/date-input';
import { createTextInput } from './components/inputs/text-input';

export interface AppContext {
  projector: Projector;
  services: {
    authenticationService: AuthenticationService;
    databaseService: DatabaseService;
  }
}

let startApp = (appContext: AppContext) => {
  let {
    projector,
    services
  } = appContext;
  let appContainer = document.getElementById('appContainer');

  let dateField = createDateInput({
    id: 'roster-date',
    label: 'Datum', 
    save: (value: string) => {
      let data: any = {};
      data[value] = true;
      return services.databaseService.set('/dates', data);
    }
  });

  let titleField = createTextInput({ 
    id: 'roster-title',
    label: 'Rooster titel', 
    save: (value: string) => {
      let data: any = {};
      data[value] = true;
      return services.databaseService.set('/rosters', data);
    }
  });

  if (appContainer) {
    projector.append(appContainer, () => h('div.app', [
      services.authenticationService.render(),
      !!services.authenticationService.getCurrentUser() ? h('div', [titleField, dateField]) : []
    ]));
  }
};

export { startApp };
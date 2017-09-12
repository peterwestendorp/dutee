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
  }
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
    databaseService: services.databaseService
  });

  let titleField = new TextInput({
    id: 'roster-title',
    label: 'Rooster titel',
    databaseService: services.databaseService
  });

  if (appContainer) {
    projector.append(appContainer, () => h('div.app', [
      services.authenticationService.render(),
      !!services.authenticationService.getCurrentUser() ? h('div', [titleField.render(), dateField.render()]) : []
    ]));
  }
};

export { startApp };
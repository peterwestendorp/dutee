import { h, Projector } from 'maquette';
import { AuthenticationService } from './services/authenticationService';
import { DatabaseService } from './services/databaseService';
import { DateInput } from './components/input/date-input-component';
import { TextInput } from './components/input/text-input-component';

export interface Services {
  authenticationService: AuthenticationService;
  databaseService: DatabaseService;
}

export interface AppContext {
  window: Window;
  projector: Projector;
  services: Services;
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
    services,
    databasePath: '/rosters'
  });

  let titleField = new TextInput({
    id: 'roster-title',
    label: 'Rooster titel',
    services,
    databasePath: '/rosters'
  });

  if (appContainer !== null) {
    projector.append(appContainer, () => h('div.App', [
      services.authenticationService.render(),
      !!services.authenticationService.getCurrentUser() ? h('div.App-content', [
        titleField.render(),
        dateField.render()
      ]) : []
    ]));
  }
};

export { startApp };

import { h, Projector } from 'maquette';
import { AuthenticationService } from './services/authenticationService';
import { DatabaseService } from './services/databaseService';
import { RosterPage } from './pages/roster-page';

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

  let rosterPage = new RosterPage(services);

  if (appContainer !== null) {
    projector.append(appContainer, () => h('div.App', [
      services.authenticationService.render(),
      !!services.authenticationService.getCurrentUser() ? h('div.App-content', [
        rosterPage.render()
      ]) : []
    ]));
  }
};

export { startApp };

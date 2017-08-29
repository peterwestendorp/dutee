import { h, Projector } from 'maquette';
import { AuthenticationService } from './services/authenticationService';
import { DatabaseService } from './services/databaseService';
import { createDateInput } from './components/date-input';
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
  let dateInput = createDateInput(); 

  if (appContainer) {
    projector.append(appContainer, () => h('div.app', [
      services.authenticationService.render(),
      !!services.authenticationService.getCurrentUser() ? dateInput : []
    ]));
  }
};

export { startApp };
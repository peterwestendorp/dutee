import { h, Projector } from 'maquette';
import { DatabaseService } from './services/databaseService';
import { IAuthenticationService } from './services/authentication-service';
import { IDatabaseService } from './services/database-service';
import { TodoIndexPage } from './pages/todo-index-page';

export interface Services {
  authenticationService: IAuthenticationService;
  databaseService: IDatabaseService;
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

  let todoIndexPage = new TodoIndexPage(services);

  if (appContainer !== null) {
    projector.append(appContainer, () => h('div.App', [
      services.authenticationService.render(),
      !!services.authenticationService.getCurrentUser() ? h('div.App-content', [
        todoIndexPage.render()
      ]) : []
    ]));
  }
};

export { startApp };

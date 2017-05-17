import { h, Projector } from 'maquette';
import { AuthenticationService } from './authenticationService';

let startApp = (projector: Projector, authenticationService: AuthenticationService) => {
  let appContainer = document.getElementById('appContainer');

  if (appContainer) {
    projector.append(appContainer, () => h('div.app', [
      authenticationService.render()
    ]));
  }
};

export { startApp };
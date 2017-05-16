import { h, createProjector} from 'maquette';
import { authenticationService } from './index';

let startApp = () => {
  let projector = createProjector();
  let appContainer = document.getElementById('appContainer');

  let handleClick = (evt: MouseEvent) => {
    authenticationService.logout().then(projector.scheduleRender);
  };

  if (appContainer) {
    projector.append(appContainer, () => {
      let user = authenticationService.getLoggedInUser();
      return h('div', [
        h('div', [
          user ? 'logged in' : 'logged out'
        ]),
        user ? h('div', {
          onclick: handleClick
        }, 'logout') : undefined
      ]);
    });
  }
};

export { startApp };
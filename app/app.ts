// module "app"
import { h, createProjector} from 'maquette';

let startApp = () => {
  let projector = createProjector();
  let appContainer = document.getElementById('appContainer');

  if (appContainer) {
    projector.append(appContainer, () => {
      return h('div', 'hello world');
    });
  }
};

export { startApp };
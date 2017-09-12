import * as Projector from 'maquette';
import { startApp } from '../app/app';
import * as sinon from 'sinon';
import { expect } from './index';

let projector: {
  append: any;
};

describe('App', () => {
  beforeEach(() => {
    projector = {
      append: sinon.stub()
    };

    sinon.stub(Projector, 'createProjector').returns(projector);
  });

  describe('startApp', () => {
    it('appends the app to the app container', () => {
      let appContainer = { foo: 'bar' };
      startApp({
        window: {
          document: {
            getElementById: () => appContainer
          }
        } as any,
        projector: projector as any,
        services: {
          authenticationService: {} as any,
          databaseService: {} as any
        }
      });

      expect(projector.append).to.have.been.calledWith(appContainer);
    });
  });
});
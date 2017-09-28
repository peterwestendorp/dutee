import * as Projector from 'maquette';
import { startApp } from '../src/app';
import * as sinon from 'sinon';
import { expect } from './index';
import { createTestProjector } from 'maquette-query';

describe('App', () => {
  let projector: {
    append: sinon.SinonStub;
  };
  let testProjector = createTestProjector();
  let appContentElement = testProjector.query('div.App-content');
  let inputElements = testProjector.queryAll('input');

  before(() => {
    projector = {
      append: sinon.stub()
    };
    sinon.stub(Projector, 'createProjector').returns(projector);
  });

  afterEach(() => {
    projector.append.resetHistory();
  });

  describe('startApp', () => {
    it('does append the app to the app container', () => {
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

    it('does not append the app to the app container', () => {
      startApp({
        window: {
          document: {
            getElementById: () => null
          }
        } as any,
        projector: projector as any,
        services: {
          authenticationService: {} as any,
          databaseService: {} as any
        }
      });

      expect(projector.append).to.not.have.been.called;
    });

    it('does render a div.App when appending the app to the app container', () => {
      let appContainer = { foo: 'bar' };
      startApp({
        window: {
          document: {
            getElementById: () => appContainer
          }
        } as any,
        projector: projector as any,
        services: {
          authenticationService: { render: sinon.stub(), getCurrentUser: sinon.stub() } as any,
          databaseService: {} as any
        }
      });

      let renderFunction = projector.append.lastCall.args[1];
      testProjector.initialize(renderFunction);

      expect(testProjector.root.vnodeSelector).to.equal('div.App');
    });

    it('does render 2 input fields in a container when there is a currentUser', () => {
      let appContainer = { foo: 'bar' };
      startApp({
        window: {
          document: {
            getElementById: () => appContainer
          }
        } as any,
        projector: projector as any,
        services: {
          authenticationService: { render: sinon.stub(), getCurrentUser: sinon.stub().returns({}) } as any,
          databaseService: {} as any
        }
      });

      let renderFunction = projector.append.lastCall.args[1];
      testProjector.initialize(renderFunction);

      expect(appContentElement.exists()).to.be.true;
      expect(inputElements.length).to.equal(2);
    });
  });
});
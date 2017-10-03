import { expect } from '../index';
import { createTestProjector, TestProjector } from 'maquette-query';
import { RosterPage } from '../../src/pages/roster-page';
import * as sinon from 'sinon';

describe('Roster page', () => {
  let testProjector: TestProjector = createTestProjector();
  let inputElement = testProjector.query('input');

  it('does render a title input field', () => {
    let databaseServiceSetStub = sinon.stub();
    let page = new RosterPage({ databaseService: { set: databaseServiceSetStub }, authenticationService: {} } as any);

    testProjector.initialize(page.render.bind(page));

    expect(inputElement.exists()).to.be.true;
  });

  it('does create a roster, when clicking the save button', () => {

  });
});
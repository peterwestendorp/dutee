import { DateInput } from '../../../app/components/inputs/date-input';
import * as sinon from 'sinon';
import { createTestProjector } from 'maquette-query';
import { expect } from '../../index';

describe('DateInput', () => {
  let databaseService: any;
  let projector = createTestProjector();
  let labelElement = projector.query('label');

  beforeEach(() => {
    databaseService = {
      set: sinon.stub()
    }
  });

  it('will render a date input', () => {
    let dateInput = new DateInput({id: 'foo', label: 'bar', databaseService});
    projector.initialize(dateInput.render);

    expect(labelElement.exists()).to.equal(true);
  });
});
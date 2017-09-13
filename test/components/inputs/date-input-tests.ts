import { DateInput } from '../../../app/components/inputs/date-input';
import * as sinon from 'sinon';
import { createTestProjector } from 'maquette-query';
import { expect } from '../../index';

describe('DateInput', () => {
  let databaseService: any;
  let databasePath = '/dates';
  let projector = createTestProjector();
  let input = projector.query('input');

  beforeEach(() => {
    databaseService = {
      set: sinon.stub()
    }
  });

  it('will render a date input', () => {
    let dateInput = new DateInput({id: 'foo', label: 'bar', databaseService});

    projector.initialize(dateInput.render.bind(dateInput));

    expect(projector.root.exists()).to.equal(true);
    expect(projector.root.children[0].text).to.equal('bar');
  });

  it('will save the value on input', () => {
    let inputValue = 'abc';
    let expectedValue = {} as any;
    expectedValue[inputValue] = true;
    let inputElementMock = { value: inputValue };
    let dateInput = new DateInput({id: 'foo', label: 'bar', databaseService});

    projector.initialize(dateInput.render.bind(dateInput));
    input.properties.afterCreate!.bind(dateInput)(inputElementMock as any, {}, '', {}, []);
    input.properties.oninput!.bind(dateInput)({} as any);

    expect(databaseService.set).to.have.been.calledWith(databasePath, expectedValue);
  });
});

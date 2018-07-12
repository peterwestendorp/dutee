import { DateInput } from '../../../src/components/input/date-input-component';
import * as sinon from 'sinon';
import { createTestProjector } from 'maquette-query';
import { expect } from '../../index';
import { SinonStub } from 'sinon';

describe('DateInput', () => {
  let save: SinonStub;
  let projector = createTestProjector();
  let input = projector.query('input');

  beforeEach(() => {
    save = sinon.stub().returns(Promise.resolve(true));
  });

  it('will render a date input', () => {
    let dateInput = new DateInput({id: 'foo', label: 'bar', services: {} as any, update: sinon.stub() });

    projector.initialize(dateInput.render.bind(dateInput));

    expect(projector.root.exists()).to.equal(true);
    expect(projector.root.children[0].text).to.equal('bar');
  });

  it('will call the update method with the new value on input', () => {
    let inputValue = 'abc';
    let inputElementMock = { value: inputValue };
    let updateStub = sinon.stub();
    let dateInput = new DateInput({id: 'foo', label: 'bar', services: { databaseService: { set: sinon.stub() } } as any, update: updateStub });

    projector.initialize(dateInput.render.bind(dateInput));
    input.properties.afterCreate!.bind(dateInput)(inputElementMock as any, {}, '', {}, []);
    input.properties.oninput!.bind(dateInput)({} as any);

    expect(updateStub).to.have.been.calledWith(inputValue);
  });
});

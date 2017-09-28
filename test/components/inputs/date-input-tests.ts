import { DateInput } from '../../../app/components/inputs/date-input';
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
    let dateInput = new DateInput({id: 'foo', label: 'bar', services: {} as any, databasePath: '/rosters'});

    projector.initialize(dateInput.render.bind(dateInput));

    expect(projector.root.exists()).to.equal(true);
    expect(projector.root.children[0].text).to.equal('bar');
  });

  it('will save the value on input', () => {
    let inputValue = 'abc';
    let inputElementMock = { value: inputValue };
    let databaseServiceSetStub = sinon.stub().returns(Promise.resolve(true));
    let databasePath = '/rosters';
    let dateInput = new DateInput({id: 'foo', label: 'bar', services: { databaseService: { set: databaseServiceSetStub } } as any, databasePath });

    projector.initialize(dateInput.render.bind(dateInput));
    input.properties.afterCreate!.bind(dateInput)(inputElementMock as any, {}, '', {}, []);
    input.properties.oninput!.bind(dateInput)({} as any);

    expect(databaseServiceSetStub).to.have.been.calledWith(databasePath, inputValue);
  });
});

import { createTestProjector } from 'maquette-query';
import { expect } from '../../index';
import * as sinon from 'sinon';
import { TextInput } from '../../../src/components/input/text-input-component';
import { SinonStub } from 'sinon';

describe('TextInput', () => {
  let save: SinonStub;
  let projector = createTestProjector();
  let input = projector.query('input');

  beforeEach(() => {
    save = sinon.stub().returns(Promise.resolve(true));
  });

  it('will render a text input', () => {
    let textInput = new TextInput({id: 'foo', label: 'bar', services: {} as any, update: sinon.stub() });

    projector.initialize(textInput.render.bind(textInput));

    expect(projector.root.exists()).to.equal(true);
    expect(projector.root.children[0].text).to.equal('bar');
  });

  it('will call the update method with the new value on input', () => {
    let inputValue = 'abc';
    let inputElementMock = { value: inputValue };
    let updateStub = sinon.stub().returns(Promise.resolve(true));
    let databasePath = '/rosters';
    let textInput = new TextInput({id: 'foo', label: 'bar', services: { databaseService: { set: sinon.stub() } } as any, update: updateStub });

    projector.initialize(textInput.render.bind(textInput));
    input.properties.afterCreate!.bind(textInput)(inputElementMock as any, {}, '', {}, []);
    input.properties.oninput!.bind(textInput)({} as any);

    expect(updateStub).to.have.been.calledWith(inputValue);
  });
});
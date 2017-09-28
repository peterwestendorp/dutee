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
    let textInput = new TextInput({id: 'foo', label: 'bar', services: {} as any, databasePath: '' });

    projector.initialize(textInput.render.bind(textInput));

    expect(projector.root.exists()).to.equal(true);
    expect(projector.root.children[0].text).to.equal('bar');
  });

  it('will save the value on input', () => {
    let inputValue = 'abc';
    let inputElementMock = { value: inputValue };
    let databaseServiceSetStub = sinon.stub().returns(Promise.resolve(true));
    let databasePath = '/rosters';
    let textInput = new TextInput({id: 'foo', label: 'bar', services: { databaseService: { set: databaseServiceSetStub } } as any, databasePath });

    projector.initialize(textInput.render.bind(textInput));
    input.properties.afterCreate!.bind(textInput)(inputElementMock as any, {}, '', {}, []);
    input.properties.oninput!.bind(textInput)({} as any);

    expect(databaseServiceSetStub).to.have.been.calledWith(databasePath, inputValue);
  });
});
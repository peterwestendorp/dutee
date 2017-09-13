import { createTestProjector } from 'maquette-query';
import { expect } from '../../index';
import * as sinon from 'sinon';
import { TextInput } from '../../../app/components/inputs/text-input';
import { SinonStub } from 'sinon';

describe('TextInput', () => {
  let save: SinonStub;
  let projector = createTestProjector();
  let input = projector.query('input');

  beforeEach(() => {
    save = sinon.stub();
  });

  it('will render a text input', () => {
    let textInput = new TextInput({id: 'foo', label: 'bar', save});

    projector.initialize(textInput.render.bind(textInput));

    expect(projector.root.exists()).to.equal(true);
    expect(projector.root.children[0].text).to.equal('bar');
  });

  it('will save the value on input', () => {
    let inputValue = 'abc';
    let inputElementMock = { value: inputValue };
    let textInput = new TextInput({id: 'foo', label: 'bar', save});

    projector.initialize(textInput.render.bind(textInput));
    input.properties.afterCreate!.bind(textInput)(inputElementMock as any, {}, '', {}, []);
    input.properties.oninput!.bind(textInput)({} as any);

    expect(save).to.have.been.calledWith(inputValue);
  });
});
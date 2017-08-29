import { h, VNode } from 'maquette';
import { InputConfig } from './index';

let createDateInput = (config: InputConfig): VNode => {
  let { 
    id, 
    label, 
    save 
  } = config;
  let inputElement: HTMLInputElement | undefined;

  let handleAfterCreate = (element: HTMLInputElement) => {
    inputElement = element;
  };
  
  let handleInput = (evt: Event) => {
    save(inputElement!.value);
  };

  return h('label', { key: id }, [
    label,
    h('input', {
      type: 'date',
      afterCreate: handleAfterCreate,
      oninput: handleInput
    })
  ]);
};

export { createDateInput };
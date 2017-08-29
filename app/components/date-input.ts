import { h } from 'maquette';

let createDateInput = () => {
  let handleDateChange = () => {};

  return h('form', [
    h('label', [
      'date',
      h('input', {
        type: 'date',
        onChange: handleDateChange
      })
    ])
  ]);
};

export { createDateInput };
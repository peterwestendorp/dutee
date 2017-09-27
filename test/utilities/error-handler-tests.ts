import { errorHandler } from '../../app/utilities/error-handler';
import { expect } from '../index';

describe('Error handler', () => {
  it('throws an error', () => {
    expect(() => {errorHandler({name: 'Foutje', message: 'Er is iets goed mis gegaan!'} as any)}).to.throw(Error,
      'Er is een fout opgetreden: Foutje. Er is iets goed mis gegaan!'
    );
  });
});
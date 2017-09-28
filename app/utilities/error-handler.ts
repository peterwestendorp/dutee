/* tslint:disable no-console */
export let errorHandler = (e: Error): void => {
  throw new Error(`Er is een fout opgetreden: ${e.name}. ${e.message}`);
};
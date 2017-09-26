/* tslint:disable no-console */
export let errorHandler = (e: Error): void => {
  console.error(`Er is een fout opgetreden: ${e.name}. ${e.message}`, e);
  throw new Error(`Er is een fout opgetreden: ${e.name}. ${e.message}`);
};
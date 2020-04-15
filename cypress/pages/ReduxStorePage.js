export const getTaskStore = () => cy.window()
  .its('store')
  .invoke('getState')
  .its('tasksStore');

export const resetStore = () => cy.window().its('store')
  .then((store) => store.dispatch({ type: 'RESET_STORE' }));

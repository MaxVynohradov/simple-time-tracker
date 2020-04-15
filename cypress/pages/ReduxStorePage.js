export const getTaskStore = () => cy.window()
  .its('store')
  .invoke('getState')
  .its('tasksStore');

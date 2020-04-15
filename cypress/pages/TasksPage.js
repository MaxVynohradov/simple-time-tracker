export const getTaskNameInput = () => cy.get('[placeholder="Name of your task"]');

export const getTimerClockFace = () => cy.get('[data-test-id="timer-clock-face"]');

export const getTimerButton = () => cy.get('[data-test-id="timer-button"]');

export const getTableDefaultText = () => cy.get('[data-test-id="empty-table-paragraph"]');

export const getTableRows = () => cy.get('tbody>tr');

export const getAlertDialog = () => cy.get('.MuiDialog-root');

export const getAlertDialogCloseBtn = () => cy.get('.MuiDialog-root button');

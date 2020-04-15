/* eslint-disable cypress/no-unnecessary-waiting */
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

import {
  getTableRows, getTaskNameInput, getTimerButton,
} from '../pages/TasksPage';
// import { getTaskStore, resetStore } from '../pages/ReduxStorePage';

// import {
//   TIMER_BUTTON, TIMER_CLOCK_FACE, TIMER_TEXT_INPUT, TASK_TABLE, REDUX_STORE,
// } from '../constants/pageObjects';

const TASK_NAME1 = 'Test task 1';

describe('Show Task Details', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.visit(Cypress.env('BASE_URL'));
    getTaskNameInput().type(TASK_NAME1);
    getTimerButton().click();
    getTimerButton().click();
    getTableRows().get(':nth-child(6) > .MuiButtonBase-root').click();
  });

  context('when task created', () => {
    it('is redirected to /tasks/:taskId path', () => {
      cy.window().its('store')
        .then((store) => {
          const [{ id: taskId }] = store.getState().tasksStore.tasks;
          cy.log('store.getState().tasksStore.tasks', taskId);
          cy.url().should('have.include', `/tasks/${taskId}`);
        });
    });
  });

  // context('when pass incorrect task ID', () => {
  //   // it('is redirected to /tasks/:taskId path', () => cy.url().should('include', '/tasks/'));
  // });
});

/* eslint-disable cypress/no-unnecessary-waiting */
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

import {
  getTableRows, getTaskNameInput, getTimerButton,
} from '../pages/TasksPage';

const TASK_NAME1 = 'Test task 1';
const TASK_DURATION = 1;

describe('Show Task Details', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.visit(Cypress.env('BASE_URL'));
    getTaskNameInput().type(TASK_NAME1);
    getTimerButton().click();
    cy.wait(TASK_DURATION * 1000);
    getTimerButton().click();
    getTableRows().get(':nth-child(6) > .MuiButtonBase-root').click();
  });

  context('when task created', () => {
    it('is redirected to /tasks/:taskId path', () => {
      cy.window().its('store')
        .then((store) => {
          const [{ id: taskId }] = store.getState().tasksStore.tasks;
          cy.location().should((loc) => {
            expect(loc.pathname).to.eq(`/simple-time-tracker/tasks/${taskId}`);
          });
        });
    });

    it('has proper data on page', () => {
      cy.window().its('store')
        .then((store) => {
          const [task] = store.getState().tasksStore.tasks;
          cy.get('.MuiList-root > :nth-child(1)').should('have.text', `ID: ${task.id}`);
          cy.get('.MuiList-root > :nth-child(3)').should('have.text', `Name: ${task.name}`);
          cy.get('.MuiList-root > :nth-child(5)')
            .should('have.text', `Start time: ${task.startTime.toTimeString().split(' ')[0]}`);
          cy.get('.MuiList-root > :nth-child(7)')
            .should('have.text', `End time: ${task.endTime.toTimeString().split(' ')[0]}`);
          cy.get('.MuiList-root > :nth-child(9)').should('have.text', `Duration: 00:00:0${TASK_DURATION}`);
        });
    });

    it('redirect correctly to main page', () => {
      cy.get('.MuiButtonBase-root').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/simple-time-tracker/tasks');
      });
    });
  });

  context('when pass incorrect task ID', () => {
    it('is redirected to /tasks/404 path', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.visit(`${Cypress.env('BASE_URL')}/tasks/neverland`, { failOnStatusCode: false });
      cy.url().should('include', '/simple-time-tracker/404');
    });
  });
});

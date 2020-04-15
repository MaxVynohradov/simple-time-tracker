// / <reference types="Cypress" />

import {
  getTableDefaultText, getTaskNameInput, getTimerButton, getTimerClockFace,
} from '../pages/TasksPage';

import { getTaskStore, resetStore } from '../pages/ReduxStorePage';

describe('Tasks Page', () => {
  context('when loaded first time', () => {
    before(() => {
      resetStore();
      cy.clearLocalStorageSnapshot();
      cy.visit(Cypress.env('BASE_URL'));
    });

    after(() => resetStore());

    it('is redirected to /tasks path', () => cy.url().should('include', '/tasks'));

    describe('task name input', () => {
      it('is focused on load', () => getTaskNameInput().should('have.focus'));

      it('is empty', () => getTaskNameInput().should('have.empty'));
    });

    describe('clock face', () => {
      it('has 00:00:00 value', () => getTimerClockFace().should('have.text', '00:00:00'));
    });

    describe('handler button', () => {
      it('has value "Start"', () => getTimerButton().should('have.text', 'Start'));
    });

    describe('task table', () => {
      it('has default text', () => getTableDefaultText().should('have.text', 'Table Empty'));
    });

    describe('redux store', () => {
      it('has default Tasks Store', () => {
        getTaskStore().its('currentTask').should((currentTask) => {
          expect(currentTask.duration).to.be.equal(0);
        });
        getTaskStore().its('tasks').should((tasks) => {
          expect(tasks).to.have.length(0);
        });
      });
    });
  });
});

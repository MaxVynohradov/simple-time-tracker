// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

import {
  getTableDefaultText, getTaskNameInput, getTimerButton, getTimerClockFace,
} from '../pages/TasksPage';
import { getTaskStore, resetStore } from '../pages/ReduxStorePage';

import {
  TIMER_BUTTON, TIMER_CLOCK_FACE, TIMER_TEXT_INPUT, TASK_TABLE, REDUX_STORE,
} from '../constants/pageObjects';

describe('Tasks Page', () => {
  context('when loaded first time', () => {
    before(() => {
      resetStore();
      cy.clearLocalStorageSnapshot();
      cy.visit(Cypress.env('BASE_URL'));
    });

    after(() => resetStore());

    it('is redirected to /tasks path', () => cy.url().should('include', '/tasks'));

    describe(TIMER_TEXT_INPUT, () => {
      it('is focused on load', () => getTaskNameInput().should('have.focus'));

      it('is empty', () => getTaskNameInput().should('have.empty'));
    });

    describe(TIMER_CLOCK_FACE, () => {
      it('has 00:00:00 value', () => getTimerClockFace().should('have.text', '00:00:00'));
    });

    describe(TIMER_BUTTON, () => {
      it('has value "Start"', () => getTimerButton().should('have.text', 'Start'));
    });

    describe(TASK_TABLE, () => {
      it('has default text', () => getTableDefaultText().should('have.text', 'Table Empty'));
    });

    describe(REDUX_STORE, () => {
      it('has default store', () => {
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

// / <reference types="Cypress" />

import {
  getTableRows, getTaskNameInput, getTimerButton, getTimerClockFace,
  getAlertDialog, getAlertDialogCloseBtn,
} from '../pages/TasksPage';

import { getTaskStore, resetStore } from '../pages/ReduxStorePage';

const TASK_NAME1 = 'Test task 1';

describe('Task', () => {
  context('when name of tasks exist', () => {
    before(() => {
      cy.clearLocalStorageSnapshot();
      cy.visit(Cypress.env('BASE_URL'));
      getTaskNameInput().type(TASK_NAME1);
    });

    context('when time is running', () => {
      before(() => getTimerButton().click());

      describe('Timer Clock Face', () => {
        it('started on button click', () => getTimerClockFace().should('not.have.text', '00:00:00'));
      });

      describe('Timer Button', () => {
        it('has "Stop" text', () => getTimerButton().should('have.text', 'Stop'));
      });
    });

    context('when time is finished', () => {
      before(() => getTimerButton().click());

      describe('Timer Clock Face', () => {
        it('has default value', () => getTimerClockFace().should('have.text', '00:00:00'));
      });

      describe('Timer Button', () => {
        it('has "Start" text', () => getTimerButton().should('have.text', 'Start'));
      });

      describe('Task Text Input', () => {
        it('is empty', () => getTaskNameInput().should('have.text', ''));
      });

      describe('Task Table', () => {
        it('should have one task', () => {
          getTableRows().should('have.length', 1);
        });
        it(`should have name ${TASK_NAME1}`, () => {
          getTableRows().first().get('td').eq(1)
            .should('have.text', TASK_NAME1);
        });
      });

      describe('Redux Store', () => {
        it('has default proper state', () => {
          getTaskStore().its('currentTask').should((currentTask) => {
            expect(currentTask).to.deep.equal({ duration: 0 });
          });
          getTaskStore().its('tasks').should((tasks) => {
            expect(tasks).to.have.length(1);
            expect(tasks[0].duration).to.be.above(0);
            expect(tasks[0].name).to.be.eq(TASK_NAME1);
            expect(tasks[0]).to.have.all.keys(['duration', 'startTime', 'endTime', 'id', 'name']);
          });
        });
      });
    });
  });

  context('when name of tasks doesn\'t exist', () => {
    before(() => {
      cy.clearLocalStorageSnapshot();
      cy.visit(Cypress.env('BASE_URL'));
      getTimerButton().click();
    });

    after(() => {
      getAlertDialogCloseBtn().click();
      getTaskNameInput().type(TASK_NAME1);
      getTimerButton().click();
      resetStore();
    });

    context('and when time is running', () => {
      before(() => getTimerButton().click());

      it('shows modal with error', () => {
        getAlertDialog().should('have.css', 'visibility').and('match', /visible/);
      });
    });
  });
});

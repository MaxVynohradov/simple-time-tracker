// / <reference types="Cypress" />

import {
  getTableDefaultText, getTaskNameInput, getTimerButton, getTimerClockFace,
} from '../pages/tasks';

import { getTaskStore } from '../pages/reduxStore';

describe('Task', () => {
  before(() => {
    cy.visit(Cypress.env('BASE_URL'));
  });

  it('should be started on button click', () => {
    getTimerButton().click();
    getTimerClockFace().should('not.have.text', '00:00:00');
  });

  context('when name of tasks exist', () => {
    it('should be finished ');
  });

  context('when name of tasks doesn\'t exist', () => {

  });
});

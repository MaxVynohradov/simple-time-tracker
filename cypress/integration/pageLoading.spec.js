/// <reference types="Cypress" />

import {
  getTableDefaultText, getTaskNameInput, getTimerButton, getTimerClockFace,
} from '../pages/tasks'

import { getTaskStore } from '../pages/reduxStore'

describe('Tasks Page', () => {
  context('when loaded first time', () => {
    before(() => cy.visit(Cypress.env('BASE_URL')))

    it('should be redirected to /tasks path', () => cy.url().should('include', '/tasks'))

    describe('task name input', () => {
      it('should be focused on load', () => getTaskNameInput().should('have.focus'))
  
      it('should be empty', () => getTaskNameInput().should('have.empty'))
    })

    describe('clock face', () => {
      it('should have 00:00:00 value', () => getTimerClockFace().should('have.text', '00:00:00'))
    })

    describe('handler button', () => {
      it('should have value "Start"', () => getTimerButton().should('have.text', 'Start'))
    })

    describe('task table', () => {
      it('should have default text', () => getTableDefaultText().should('have.text', 'Table Empty'))
    })

    describe('redux store', () => {
      it('should have default Tasks Store', () => getTaskStore()
        .should('deep.equal', { tasks: [], currentTask: { duration: 0 } }))
    })
  })
})
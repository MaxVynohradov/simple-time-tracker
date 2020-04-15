/// <reference types="Cypress" />

describe('Tasks Page', () => {
  context('when loaded first time', () => {
    before(() => {
      cy.visit(Cypress.env('BASE_URL'));
    })

    it('should be redirected to /tasks path', () => {
      cy.url().should('include', '/tasks')
    })

    describe('task name input', () => {
      it('should be focused on load', () => {
        cy.get('[placeholder="Name of your task"]').should('have.focus')
      });
  
      it('should be empty', () => {
        cy.get('[placeholder="Name of your task"]').should('have.empty')
      })
    })

    describe('clock face', () => {
      it('should have 00:00:00 value', () => {
        cy.get('[data-test-id="timer-clock-face"]').should('have.text', '00:00:00')
      })
    })

    describe('handler button', () => {
      it('should have value "Start"', () => {
        cy.get('[data-test-id="timer-button"]').should('have.text', 'Start')
      })
    })

    describe('task table', () => {
      it('should have default text', () => {
        cy.get('[data-test-id="empty-table-paragraph"]').should('have.text', 'Table Empty')
      })
    })

    describe('redux store', () => {
      it('should have default Tasks Store', () => {
        cy.window()
          .its('store')
          .invoke('getState')
          .its('tasksStore')
          .should('deep.equal', { tasks: [], currentTask: { duration: 0 } })
      })
    })
  })
})
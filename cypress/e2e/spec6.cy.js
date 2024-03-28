/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-data-session
import 'cypress-data-session'

function threeTodos(recompute = false) {
  if (recompute) {
    Cypress.clearDataSession('threeTodos')
  }
  cy.dataSession({
    name: 'threeTodos',
    setup() {
      cy.visit('/')
      cy.get('input#todo')
        .type('write code{enter}')
        .type('write tests{enter}')
        .type('deploy{enter}')
      cy.get('.todos .item').should('have.length', 3)
      cy.window().invoke('getState')
    },
    recreate(state) {
      // it helps to clone the object
      // to prevent mutations from changing the value
      // inside the data session
      cy.visit('/').invoke('render', structuredClone(state))
    },
  })
}

describe('Todo app', () => {
  it('adds todos', () => {
    threeTodos(true)
  })

  it('removes todos', () => {
    threeTodos()
    cy.get('.todos .item').should('have.length', 3)
    cy.contains('.item', 'write tests').contains('button', 'Delete').click()
    cy.get('.todos .item').should('have.length', 2)
  })
})

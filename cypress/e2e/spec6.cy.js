/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-data-session
import 'cypress-data-session'

function threeTodos(recompute = false) {
  // clear the data session forcing it to call the `setup` method
  // and use the UI to create the todos and grab the state
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
    // if there is a state in memory, use it
    // to set the application instantly
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

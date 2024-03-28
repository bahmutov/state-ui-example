/// <reference types="cypress" />

import { getState } from '../../public/state'

describe('Todo app', () => {
  let state

  it('adds todos', () => {
    cy.visit('/')
    cy.get('input#todo')
      .type('write code{enter}')
      .type('write tests{enter}')
      .type('deploy{enter}')
    cy.get('.todos .item')
      .should('have.length', 3)
      .then(() => {
        state = getState()
        expect(state, 'state').to.deep.equal({
          todos: ['write code', 'write tests', 'deploy'],
        })
      })
  })

  it('removes todos (with reload)', () => {
    cy.visit('/').invoke('saveState', state).reload()
    cy.get('.todos .item').should('have.length', 3)
    cy.contains('.item', 'write tests').contains('button', 'Delete').click()
    cy.get('.todos .item').should('have.length', 2)
  })
})

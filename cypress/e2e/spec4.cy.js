/// <reference types="cypress" />

describe('Todo app', () => {
  it('adds todos', () => {
    cy.visit('/')
    cy.get('input#todo')
      .type('write code{enter}')
      .type('write tests{enter}')
      .type('deploy{enter}')
    cy.get('.todos .item').should('have.length', 3)
  })

  it('removes todos', () => {
    const todos = ['write code', 'write tests', 'deploy']

    cy.visit('/', {
      onBeforeLoad(win) {
        let saveState
        Object.defineProperty(win, 'saveState', {
          get() {
            return saveState
          },
          set(fn) {
            saveState = fn
            // immediately set the state from the test
            saveState({ todos })
          },
        })
      },
    })
    cy.get('.todos .item').should('have.length', 3)
    cy.contains('.item', 'write tests').contains('button', 'Delete').click()
    cy.get('.todos .item').should('have.length', 2)
  })

  it('removes todos (with reload)', () => {
    const todos = ['write code', 'write tests', 'deploy']

    // cy.visit yields the "window" object, thus we can
    // quickly invoke the "saveState" method
    cy.visit('/').invoke('saveState', { todos }).reload()
    cy.get('.todos .item').should('have.length', 3)
    cy.contains('.item', 'write tests').contains('button', 'Delete').click()
    cy.get('.todos .item').should('have.length', 2)
  })

  it('removes todos (using app render)', () => {
    const todos = ['write code', 'write tests', 'deploy']

    // cy.visit yields the "window" object
    // once the app sets the "window.render" method
    // we can call it with new state
    cy.visit('/').invoke('render', { todos })
    cy.get('.todos .item').should('have.length', 3)
    cy.contains('.item', 'write tests').contains('button', 'Delete').click()
    cy.get('.todos .item').should('have.length', 2)
  })
})

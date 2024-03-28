import { getState, saveState } from './state.js'

// DOM elements
const app = document.querySelector('#app')
const form = document.querySelector('#add-todo')

const state = getState()

/**
 * Add todo to the list
 * @param {Event} event The event object
 */
function addTodo(event) {
  // Stop the form from reloading the page
  event.preventDefault()

  // If there's no field value, ignore the submission
  if (!form.todo.value) return

  // Otherwise, add todo and rerender the UI
  state.todos.push(form.todo.value)

  // Clear the form field
  form.todo.value = ''

  app.innerHTML = getHTML(state)

  // Save the list
  saveState(state)
}

/**
 * Remove todo items
 * @param  {Event} event The event object
 */
function removeTodo(event) {
  // Only run on [data-delete] items
  let index = event.target.getAttribute('data-delete')
  if (!index) return

  // Otherwise, remove the todo and rerender the UI
  state.todos.splice(index, 1)
  app.innerHTML = getHTML(state)

  // Save the list
  saveState(state)
}

/**
 * Create the HTML based on the app state
 */
function getHTML(state) {
  // If there are no todos, show a message
  if (!state.todos.length) {
    return `<p><em>You don't have any todos yet.</em></p>`
  }

  // Otherwise, render the todo items
  return `
		<ul class="todos">
			${state.todos
        .map(function (todo, index) {
          return `<li class="item">${todo} <button data-delete="${index}">Delete</button></li>`
        })
        .join('')}
		</ul>`
}

// Add todos when form is submitted
form.addEventListener('submit', addTodo)

// Remove todos when delete button is clicked
document.addEventListener('click', removeTodo)

// Render the UI
app.innerHTML = getHTML(state)

// DOM elements
const app = document.querySelector('#app')
const form = document.querySelector('#add-todo')

// Todo data
let todos = JSON.parse(localStorage.getItem('todos-state-based')) || []

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
  todos.push(form.todo.value)
  app.innerHTML = getHTML()

  // Clear the form field
  form.todo.value = ''

  // Save the list
  localStorage.setItem('todos-state-based', JSON.stringify(todos))
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
  todos.splice(index, 1)
  app.innerHTML = getHTML()

  // Save the list
  localStorage.setItem('todos-state-based', JSON.stringify(todos))
}

/**
 * Create the HTML based on the app state
 */
function getHTML() {
  // If there are no todos, show a message
  if (!todos.length) {
    return `<p><em>You don't have any todos yet.</em></p>`
  }

  // Otherwise, render the todo items
  return `
		<ul>
			${todos
        .map(function (todo, index) {
          return `<li>${todo} <button data-delete="${index}">Delete</button></li>`
        })
        .join('')}
		</ul>`
}

// Add todos when form is submitted
form.addEventListener('submit', addTodo)

// Remove todos when delete button is clicked
document.addEventListener('click', removeTodo)

// Render the UI
app.innerHTML = getHTML()

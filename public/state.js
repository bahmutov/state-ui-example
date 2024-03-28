// application data. Increment the suffix counter
// if the schema changes to get fresh state
// or implement data migration logic
const storeKey = 'todos-state-based-1'

export function getState() {
  const defaultState = {
    todos: [],
  }
  return JSON.parse(localStorage.getItem(storeKey)) || defaultState
}

export function saveState(state) {
  localStorage.setItem(storeKey, JSON.stringify(state))
}

if (window.Cypress) {
  window.getState = getState
  window.saveState = saveState
}

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:5000',
    viewportHeight: 500,
    viewportWidth: 500,
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
})

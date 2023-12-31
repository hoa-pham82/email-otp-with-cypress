const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', '**/*/*.feature'],
        screenshotOnRunFailure: true,
        video: true,
        experimentalOriginDependencies: false,
        retries: 0
    },
    env: {}
})

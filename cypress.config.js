const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5000",
    // testFiles: "cypress/api/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message + "\n");
          return null;
          // Then to see the log messages in the terminal
          // Use: cy.task("log", "my message");
        },
      });
    },
  },
});

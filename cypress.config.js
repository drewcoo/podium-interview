const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "254xa2",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners herenotepad
    },
  },
});

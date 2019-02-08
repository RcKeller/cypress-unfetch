
/*
USAGE: in `support/index.(js|ts)`
import '@rckller/cypress-unfetch'
*/
before(() => {
  cy.log('Polyfill Fetch >>> XHR Fallback')
  // Load the standalone polyfill w/ a closure, prevents race
  let unfetch
  cy.readFile('node_modules/unfetch/dist/unfetch.umd.js')
    .then(file => unfetch = file) // eslint-disable-line no-return-assign
  // Then initialize it before the page loads
  Cypress.on('window:before:load', (win) => {
    delete win.fetch
    win.eval(unfetch)
    win.fetch = win.unfetch
  })
})

/// <reference path='./index.d.ts' />

before(() => {
  cy.log('Polyfill Fetch >>> XHR Fallback')
  // Load the standalone polyfill w/ a closure, prevents race
  let unfetch
  cy.readFile('node_modules/unfetch/dist/unfetch.umd.js')
    .then(file => unfetch = file) // eslint-disable-line no-return-assign
  // Then initialize it before the page loads
  Cypress.on('window:before:load', (win) => {
    cy.spy(win.console, 'log')
      .spy(win.console, 'warn')
      .spy(win.console, 'error')
    delete win.fetch
    win.eval(unfetch)
    win.fetch = win.unfetch
  })
})

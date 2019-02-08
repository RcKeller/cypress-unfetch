/// <reference path='./await.d.ts' />

/*
USAGE: in `support/index.(js|ts)`
import '@rckller/cypress-unfetch/await'
*/

/**
*   Initialize cy.server & tracking for in-flight XHR
**/
beforeEach(() => { // May need to reference `this` in the future
  Cypress._xhr = 0
  const onRequest = () => { Cypress._xhr++ }
  // Allocate a delay in case any API calls chain off each other
  const onResponse = (xhr) => {
    const delayTime = 500
    Cypress._xhr === 1
      ? setTimeout(() => { Cypress._xhr-- }, delayTime)
      : Cypress._xhr--
  }
  const onAbort = () => { Cypress._xhr-- }
  cy
    .log('Cypress-Unfetch: Tracking XHR')
    .server({ onRequest, onResponse, onAbort })
})


/**
*   Synchronously wait forin-flight XHR to resolve
*   @function   cy.await
*   @param      {number}  []  Default Timeout
**/
Cypress.Commands.add('await', (timeout) => {
  // Use any cy.get() cb so cypress timeouts are applied to should() expressions
  cy.window({ log: false, timeout })
    .should(() => expect(Cypress._xhr || 0, 'In-Flight XHR').to.equal(0))
})

/// <reference path='./await.d.ts' />

/**
* Initialize cy.server & tracking for in-flight XHR
* (these must execute beforeEach)
**/
beforeEach(() => { // May need to reference `this` in the future
  cy._apiCount = 0
  const onRequest = () => {
    cy._apiCount++
  }
  // Allocate a delay in case any API calls chain off each other
  const onResponse = (xhr) => {
    const delayTime = 500
    (cy._apiCount === 1)
      ? setTimeout(() => { ._apiCount-- }, delayTime)
      : cy._apiCount--
  }
  const onAbort = () => { cy._apiCount-- }
  cy.server({ onRequest, onResponse, onAbort })
})


/**
*   Synchronously wait forin-flight XHR to resolve
*   @function   cy.await
**/
Cypress.Commands.add('await', () => {
  // Use any cy.get() cb so cypress timeouts are applied to should() expressions
  cy.window({ log: false })
    .should(() => expect(cy._apiCount || 0, 'In-Flight XHR').to.equal(0))
})

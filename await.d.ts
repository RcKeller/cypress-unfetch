declare namespace Cypress {
  interface Chainable {
    awaitXHR: () => Chainable<any>
    _apiCount: number
  }
}

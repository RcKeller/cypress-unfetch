declare namespace Cypress {
  interface Chainable {
    awaitXHR: (timeout?: number) => Chainable<any>
    _apiCount: number
  }
}

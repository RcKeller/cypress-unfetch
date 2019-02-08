declare namespace Cypress {
  interface Cypress {
    _xhr: number
  }
  interface Chainable {
    await: (timeout?: number) => Chainable<any>
  }
}


# @rckeller/cypress-react
Unofficial Cypress utilities for tracking network state

```
npm i -D @rckeller/cypress-unfetch
```

## Configuration

```js
// In `support/index.js`, to configure XHR/Fetch tracking
import '@rckeller/cypress-unfetch'
// Optional: in `support/commands.js`, to register cy.await()
import '@rckeller/cypress-unfetch/await'
// ... which can be invoked manually, or automatically for all tests
afterEach(() => {
  cy.await()
})
```

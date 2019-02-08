
# @rckeller/cypress-react
Unofficial Cypress utilities for tracking network state

```
npm i -D @rckeller/cypress-unfetch
```

## Configuration

These utilities automatically configure your cypress instance upon import.

```js
// support/index.js
import '@rckeller/cypress-unfetch'
```

We recommmend setting up the optional `cy.await` command, which tracks in-flight requests in the background.
You can use this to wait for network state to resolve before progressing to a new test run.

```js
// support/index.js
import '@rckeller/cypress-unfetch/await'

// You can add an afterEach to this file, which becomes "global"
afterEach(() => {
  cy.await()
})
```

Registering `cy.await` starts a server in the background, which can be used to track and block specific routes like so.

```js
// in support/index.js OR a test
beforeEach(() => {
  cy.route('/api/**').as('API')
})

test('something', () => {
  cy.log('before...')
    .wait('@API')
    .log('...after')
})
```
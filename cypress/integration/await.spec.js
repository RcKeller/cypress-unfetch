/// <reference types="Cypress" />
context('await', () => {
  it('should instantiate the Cypress._xhr accumulator value', () => {
    expect(Cypress._xhr).to.be.a('number')
    expect(Cypress._xhr).to.equal(0)
  })

  it('should register the await command', () => {
    // expect(Cypress).to.have.prop('await')
    expect(cy.await).to.be.a('function')
  })

  it('should wait for XHR to resolve after invoking await', () => {
    cy
      .route('/todos/**').as('API')
      .visit('cypress/pages/index.html')
      .await()
    expect(Cypress._xhr).to.equal(0)
  })
})

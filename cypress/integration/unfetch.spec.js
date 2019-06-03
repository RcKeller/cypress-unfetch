/// <reference types="Cypress" />
context('unfetch', () => {
  it('should be able to read XHR that uses the fetch API', () => {
    cy
      .route('/todos/**').as('API')
      .visit('cypress/pages/index.html')
      .wait('@API')
      // Check network state
      .then((xhr) => {
        const { body } = xhr.response
        expect(body.id).to.equal(1)
        expect(body.title).to.be.a('string')
      })
    // Check DOM state
    cy
      .get('#todo h2')
      .contains('1)') // The API ID
  })

  it('should be able to stub XHR with a mock response', () => {
    const mockResponse = {
      userId: 1,
      id: 1,
      title: 'Mocked Todo Item',
      completed: true
    }
    cy
      .route({
        method: 'GET',
        url: '/todos/**',
        status: 200,
        response: mockResponse
      }).as('API')
      .visit('cypress/pages/index.html')
      .wait('@API')
      // Check network state
      .then((xhr) => {
        console.warn('XHR', xhr)
        const { body } = xhr.response
        expect(body.id).to.equal(mockResponse.id)
        expect(body.title).to.equal(mockResponse.title)
      })
    // Check DOM state
    cy
      .get('#todo h2')
      .contains(`${mockResponse.id}`)
      .contains(mockResponse.title)
  })
})

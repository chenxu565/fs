describe('Blog app', function() {
  beforeEach(function() {
    // Reset the database before each test.
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // Visit the application's URL.
    cy.visit('')
  })

  // Make a test for checking that the application displays the login form by default.
  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.contains('button', 'login').should('exist')
      .and('be.visible').and('be.enabled')
  })
})
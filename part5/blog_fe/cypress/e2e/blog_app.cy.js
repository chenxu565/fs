describe('Blog app', function() {
  beforeEach( function() {
    // Reset the database before each test.
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // Visit the application's URL.
    cy.visit('')
    // Create a new user for each test.
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  // Make a test for checking that the application displays the login form by default.
  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')
      .and('be.visible').and('be.enabled')
  })

  // Make a test for logging in.
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.msg').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })
  // Make a test for creating a new blog.
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      // Create two blogs for each test.
      const blog1 = {
        title: 'First blog',
        author: 'Rob Martin',
        url: 'http://firstclasstests.com',
      }
      const blog2 = {
        title: 'Second blog',
        author: 'Peter Parker',
        url: 'http://secondclasstests.com',
      }
      cy.createBlog(blog1)
      cy.createBlog(blog2)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://docs.cypress.io')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')

      // Check that the blog is displayed in the list of blogs.
      cy.get('.blog').should('have.length', 3)
        .and('contain', 'a blog created by cypress')
    })
  })
})
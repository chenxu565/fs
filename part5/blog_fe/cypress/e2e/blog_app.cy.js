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

    // Make a test for creating a new blog.
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

    // Make a test for liking a blog.
    it('A blog can be liked', function() {
      cy.contains('Second blog').parent().as('secondBlog')
      cy.get('@secondBlog').contains('view').click()
      cy.get('@secondBlog').contains('like').click()
      cy.get('@secondBlog').contains('likes 1')
    })

    // Make a test for deleting a blog.
    it('A blog can be deleted', function() {
      cy.contains('Second blog').parent().as('secondBlog')
      cy.get('@secondBlog').contains('view').click()
      cy.get('@secondBlog').contains('remove').click()
      cy.get('html').should('not.contain', 'Second blog')
    })

    // Make a test for checking that only the creator can see the delete button of a blog, not anyone else.
    it('Only creator can see the delete button of a blog', function() {
      cy.contains('Second blog').parent().as('secondBlog')
      cy.get('@secondBlog').contains('view').click()
      cy.get('@secondBlog').should('contain', 'remove')
      // Logout the user.
      cy.contains('logout').click()

      // Login with another user.
      const user = {
        name: 'Ohter User',
        username: 'other',
        password: 'secret'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.login({ username: 'other', password: 'secret' })

      // Check that the delete button is not visible.
      cy.contains('Second blog').parent().as('secondBlog')
      cy.get('@secondBlog').contains('view').click()
      cy.get('@secondBlog').should('not.contain', 'remove')
    })

    // Make a test for checking that the blogs are ordered according to likes with the blog with the most likes being first.
    it('Blogs are ordered according to likes', function() {
      // Like the second blog once.
      cy.contains('Second blog').parent().as('secondBlog')
      cy.get('@secondBlog').contains('view').click()
      cy.get('@secondBlog').contains('like').click()

      // Wait for 1 second.
      cy.wait(1000)

      // Blogs should now be sorted by likes in descending order
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('Second blog')
        cy.wrap(blogs[1]).contains('First blog')
      })

      // Like the first blog twice.
      cy.contains('First blog').parent().as('firstBlog')
      cy.get('@firstBlog').contains('view').click()
      cy.get('@firstBlog').contains('like').click()
      cy.get('@firstBlog').contains('like').click()

      // Wait for 1 second.
      cy.wait(1000)

      // Blogs should now be sorted by likes in descending order
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('First blog')
        cy.wrap(blogs[1]).contains('Second blog')
      })
    })

  })
})
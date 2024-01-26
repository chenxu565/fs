describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'secret',
    })
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('welcome')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('You are NOT gonna need it!')
      cy.get('#author').type('Ron Jeffries')
      cy.get('#url').type(
        'https://ronjeffries.com/xprog/articles/practices/pracnotneed/',
      )
      cy.contains('create').click()

      cy.contains('You are NOT gonna need it!')
      cy.contains('Ron Jeffries')
    })
  })

  describe('When a blog has been created', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'You are NOT gonna need it!',
        author: 'Ron Jeffries',
        url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed//',
      })
    })

    it('it can be liked', function () {
      cy.contains('You are NOT gonna need it!').click()
      cy.contains('like').click()

      cy.contains('1 likes')
    })

    it('the creator can delete it', function () {
      cy.contains('You are NOT gonna need it!').click()
      cy.contains('remove').click()

      cy.contains('removed')
      cy.get('html').should('not.contain', 'You are NOT gonna need it!')
    })

    it('a non creator can not delete a blog', function () {
      cy.contains('logout').click()
      cy.login({ username: 'hellas', password: 'secret' })
      cy.contains('You are NOT gonna need it!').click()
      cy.contains('delete').should('not.exist')
    })
  })

  after(function() {
    // Code to log out after all tests are done
    cy.contains('button', 'logout').click(); // Targets a button element containing the text 'logout'
  })
})

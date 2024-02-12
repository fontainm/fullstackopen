describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test',
    }
    const user2 = {
      name: 'Adam West',
      username: 'west',
      password: 'west',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.notification.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('Test User logged in').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('Test Title')
      cy.get('#url').type('Test URL')
      cy.get('#create-button').click()
      cy.get('.notification.success')
        .should('contain', 'New blog added: Test Title by Test User')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('Title: Test Title')
      cy.contains('view')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Title',
          author: 'Test User',
          url: 'Test URL',
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.notification.success')
          .should('contain', 'Blog liked')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
        cy.get('#likes').should('contain', 1)
      })
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Title 1',
          author: 'Test User',
          url: 'Test URL 1',
        })
        cy.createBlog({
          title: 'Test Title 2',
          author: 'Test User',
          url: 'Test URL 2',
        })
        cy.logout()
        cy.login({ username: 'west', password: 'west' })
        cy.createBlog({
          title: 'Adam Wests Blog',
          author: 'Test User',
          url: 'Adam URL',
        })
      })

      it('a blog can by deleted by the creator', function () {
        cy.contains('Adam Wests Blog').contains('view').click()
        cy.contains('Adam Wests Blog')
          .parent()
          .find('button')
          .contains('remove')
          .click()
        cy.get('.notification.success')
          .should('contain', 'Deleting blog successful')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.contains('Adam Wests Blog').should('not.exist')
      })

      it('a blog cannot be deleted by another user', function () {
        cy.contains('Test Title 2').contains('view').click()
        cy.contains('Test Title 2')
          .parent()
          .find('button')
          .contains('remove')
          .should('not.exist')
      })
    })
  })
})

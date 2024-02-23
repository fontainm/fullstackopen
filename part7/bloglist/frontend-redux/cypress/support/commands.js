// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('blogUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('blogUser')
  cy.visit('')
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const user = JSON.parse(localStorage.getItem('blogUser'))
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes, user },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })

  cy.visit('')
})

Cypress.Commands.add('likeBlog', (title) => {
  cy.visit('')
  cy.contains(title).contains('view').click()
  cy.contains(title).parent().find('button').contains('like').click()
  cy.wait(500)
})

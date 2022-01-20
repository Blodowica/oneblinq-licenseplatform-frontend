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
Cypress.Commands.add("userLogin", () => {
  //adding a new command named login
  const url = Cypress.env('url')
  const password = Cypress.env('loginUserPassword')
  const email = Cypress.env('loginUserEmail')
  cy.get('[data-testId=LoginEmail]').type(`${email}`)
  cy.get('[data-testId=LoginPassword]').type(`${password}`)
  cy.get('[data-testId=LoginButton]').click()
});

Cypress.Commands.add("adminLogin", () => {
  //adding a new command named login
  const url = Cypress.env('url')
  const password = Cypress.env('loginAdminPassword')
  const email = Cypress.env('loginAdminEmail')
  cy.get('[data-testId=LoginEmail]').type(`${email}`)
  cy.get('[data-testId=LoginPassword]').type(`${password}`)
  cy.get('[data-testId=LoginButton]').click()
});

Cypress.Commands.add("view", () => {
    //Setting viewport and visiting website
    const url = Cypress.env('url')
    cy.viewport(1920,1080)
    cy.visit(`${url}`)
  });
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

/// <reference types="cypress" />


 // If you have a repeatable method/ function for example logging in,
 // it is best to add a command in the commands.js file(support folder) and call it in tests
describe('Test description', ()=>{
    it('test title', ()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('ttlicensing.netlify.app');
        cy.get('[data-testid="LoginEmail"]').clear();
        cy.get('[data-testid="LoginEmail"]').type('admin@gmail.com');
        cy.get('[data-testid="LoginPassword"]').clear();
        cy.get('[data-testid="LoginPassword"]').type('admin');
        cy.get('[data-testid="LoginButton"]').click();
        cy.get('#basic-nav-dropdown > svg').click();
        cy.get('[href="/profile"]').click();
        cy.get('.col > .d-flex').click();
        cy.get('.justify-content-between > :nth-child(1) > .btn').click();
        /* ==== End Cypress Studio ==== */
    })
})
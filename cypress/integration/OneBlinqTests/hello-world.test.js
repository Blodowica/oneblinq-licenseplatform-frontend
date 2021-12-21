/// <reference types="cypress" />


describe('ahaha', ()=>{
    it('test one', ()=>{
        const url = Cypress.env('REACT_APP_FRONTED_URL')
        cy.log(url)
        cy.viewport(1920,1080)
        cy.visit(url)
     
        cy.get('[data-testId=LoginEmail]').type('thomasvandermolen2@gmail.com')
        cy.get('[data-testId=LoginPassword]').type('admin')
        cy.get('[data-testId=LoginButton]').click()

      
    })
})
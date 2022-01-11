/// <reference types="cypress" />

describe('Test description', ()=>{
    it('Login test', ()=>{  
        cy.view();
        cy.login("thomasvandermolen2@gmail.com", "admin")
      
    })
})


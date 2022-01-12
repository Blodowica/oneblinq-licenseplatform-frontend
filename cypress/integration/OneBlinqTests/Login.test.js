/// <reference types="cypress" />

 // If you have a repeatable method/ function for example logging in,
 // it is best to add a command in the commands.js file(support folder) and call it in tests
 describe('Test description', ()=>{
    it('test title', ()=>{
        // *cy.view()* visits the local host, backend and front end needs to be running
        // *cy.userLogin()* Logs in as user
        // *cy.adminLogin()* Logs in as admin 

    })
})

describe('Logs user in as an user', ()=>{
    it('Login as User test', ()=>{  
        cy.view();
        cy.userLogin();
        cy.contains("Welcome")
      
    })
})

describe('Logs user in as an admin', ()=>{
    it('Login as Admin test', ()=>{  
        cy.view();
        cy.adminLogin();
        cy.contains("Welcome")
      
    })
})


///<reference types="cypress" />

describe("Test Forgotten password Page", () => {

    it('Redirect forgotten password wrong email test test', () => {
        cy.view()

        //click on forgot password
        cy.get('.text-end > span').click();
        cy.contains("We will send you an email with instructions on how to reset your password.")
        //clear email input if there is any
        cy.get('.form-control').clear();
        //type wrong email
        cy.get('.form-control').type('bakagsdsoiwrongEmail@gmail.com');
        //click reset password
        cy.get('.mt-2').click();



    })

    it('Redirect forgotten password cancel test', () => {
        cy.view()
        //click forgot password button
        cy.get('.text-end > span').click();

        cy.contains("We will send you an email with instructions on how to reset your password.")
        // click back button
        cy.get('.btn-outline-dark').click();
    })
})
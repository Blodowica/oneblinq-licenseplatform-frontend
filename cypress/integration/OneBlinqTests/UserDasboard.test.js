/// <reference types="cypress" />

describe('User Dasboard interactiion Tests', () => {

    it('Load user dashBoard test', () => {
        cy.view()
        cy.userLogin()

        cy.contains('Licenses')
        cy.contains('License key')
        cy.contains('Uses')
        cy.contains('Tier')
        cy.contains('Payment period')
        cy.contains('Expiration date')
        cy.contains('Status')

    })

    it("click More button Test", () => {
        cy.view()
        cy.userLogin()

        //click More button
        cy.get(':nth-child(2) > [style="width: 110px;"] > .p-1').click();
        cy.contains('Product')
        cy.contains('Recurrence')
        cy.contains('Enable')
        //close modal
        cy.get('.btn-close').click();

    })


    it("User copy license key ", () => {
        cy.view()
        cy.userLogin()
        //disable window alert that makes the test hang
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('DISABLED WINDOW PROMPT');
        });
        //click copy license key icon on dashboard
        cy.get(':nth-child(1) > .Userdashboardlicensekey > .ms-2').click();

    })

    it("User copy license key from modal ", () => {
        cy.view()
        cy.userLogin()
        //disable window alert that makes the test hang
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('DISABLED WINDOW PROMPT');
        });

        // click more button
        cy.get(':nth-child(1) > [style="width: 110px;"] > .p-1').click();
        //click copy icon in  modal
        cy.get('.ms-1 > .PointOnHover').click();

    })

})
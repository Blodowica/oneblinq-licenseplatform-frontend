describe('Check Admin Dashboard functionality', async() => {
    // it('Check if the page is loaded', async() => {
    //     cy.view();
    //     cy.adminLogin();
    //     cy.get(':nth-child(1) > [style="width: 110px;"] > .p-1').click();
    //     cy.contains('Modal');
    // })

    /* ==== Test Created with Cypress Studio ==== */
    it('Test Admin Dashboard', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.view();
        cy.adminLogin();
        cy.get(':nth-child(1) > [style="width: 110px;"] > .p-1').click();
        cy.contains('License:');

        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Test Users tab Details button', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.view();
        cy.adminLogin();
        cy.get('#controlled-tab-example-tab-users').click();
        cy.get(':nth-child(1) > [style="width: 110px;"] > .p-1').click();
        cy.contains('User:');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Test Users tab Edit button in Details Modal', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.view();
        cy.adminLogin();
        cy.get('#controlled-tab-example-tab-users').click();
        cy.get(':nth-child(1) > [style="width: 110px;"] > .p-1').click();
        cy.get('.pb-1 > .btn').click();
        cy.contains('User:');
        /* ==== End Cypress Studio ==== */
    });
})
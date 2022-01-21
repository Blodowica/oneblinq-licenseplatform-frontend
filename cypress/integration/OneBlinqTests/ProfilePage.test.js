describe('Check Profile Page functionality 2', async() => {
    it('Check if the page is loaded', async() => {
        cy.view();
        cy.adminLogin();
        cy.get('[d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"]').click();
        cy.get('[href="/profile"]').click();
        cy.contains('Personal details');
    })
})

describe('Check Profile Page functionality', async() => {
    it('Toggle Edit button', async() => {
        /* ==== Generated with Cypress Studio ==== */
        cy.view();
        cy.adminLogin();
        cy.get('[d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"]').click();
        cy.get('[href="/profile"]').click();
        cy.get('.col > .d-flex').click();
        cy.contains('Cancel');
        cy.get('.justify-content-between > :nth-child(1) > .btn').click();
        /* ==== End Cypress Studio ==== */
    })
})


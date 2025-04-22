//Test to verify the Admin functionalities
describe("Verifying admin functionalities",()=>{
    before(()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.wait(3000);
        cy.get('input[name="username"]').type("Admin");
        cy.get('input[name="password"]').type("admin123");
        cy.get('button[type="submit"]').click();
        //handling app exception
        Cypress.on('uncaught:exception', (err, runnable) => {
          return false;
        });
    })

    it("Test to check if we are on the Admin panel",()=>{
        cy.contains('span','Admin').click();
        cy.url().should('include','/admin/viewSystemUsers');

        //to check if a certain user is existing
        // cy.get('input.oxd-input').type("Admin");

        //feed in the parameters for the user search query
        cy.contains('label','Username').parent().next().find('input').type('Admin Admin123');
        cy.contains('label','User Role').parent().next().find('div.oxd-select-text-input').click();
        cy.get('div[role="listbox"]').contains('Admin').click();
        cy.contains('label','Employee Name').parent().next().find('input').type('Admin Admin123');
        cy.contains('label','Status').parent().next().find('div.oxd-select-text-input').click();
        cy.get('div[role="listbox"]').contains('Enabled').click();
        cy.get('button[type="submit"]').click();

        //now check if there are results returned by the query
        cy.get('div.oxd-table-card')
        .its('length')
        .then((rowCount) => {
        expect(rowCount).to.be.greaterThan(0); // assert if at least 1 row is present
        });
    })

})
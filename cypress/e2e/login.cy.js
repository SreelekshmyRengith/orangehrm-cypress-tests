// Login Page Positive and Negative Test Cases

describe('Login Page Test Scenarios', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait(3000);

    //handling app exception
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Login with correct credentials and logout', () => {
    // Logging in with correct inputs
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Successful login
    cy.url().should('include', '/dashboard');

    // Page title verification
    cy.title().should('eq', 'OrangeHRM');

    // Logout
    cy.get('p.oxd-userdropdown-name').click();
    cy.get('a.oxd-userdropdown-link').contains('Logout').click();

    // Verify redirected to login page
    cy.url().should('include', '/auth/login');
  });

  it('Login with incorrect username', () => {
    cy.get('input[name="username"]').type('WrongUser1');
    cy.get('input[name="password"]').type('WUser123');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('Login with incorrect password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('Login with empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Required').should('be.visible');
  });

});

describe('Blogs app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173/');
  });

  it('shows Login form correctly', function () {
    cy.contains('User LogIn').click();
    cy.contains('Log in to application');
    cy.get('.login-form').as('loginForm');
    cy.get('@loginForm').contains('Username:');
    cy.get('@loginForm').contains('Password:');
    cy.get('@loginForm').contains('Login');
  });

  it('user can login', function () {
    // cy.contains('log in').click();
    // cy.get('input:first').type('mluukkai');
    // cy.get('input:last').type('salainen');
  });
});

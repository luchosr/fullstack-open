describe('Blogs app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'luchosr',
      password: 'wordpass',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:5173');
  });

  // beforeEach(function () {
  //   cy.visit('http://localhost:5173/');
  // });

  it('shows Login form correctly', function () {
    cy.contains('User LogIn').click();
    cy.contains('Log in to application');

    cy.get('.login-form').as('loginForm');

    cy.get('@loginForm').contains('Username:');
    cy.get('@loginForm').contains('Password:');
    cy.get('@loginForm').contains('Login');
  });

  describe('App Log In', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('User LogIn').click();

      cy.get('#username').type('luchosr');
      cy.get('#password').type('wordpass');

      cy.get('#login-button').click();

      cy.contains('luchosr is logged in');
    });

    it('user cannot login with incorrect credentials', function () {
      cy.contains('User LogIn').click();

      cy.get('#username').type('luchosr');
      cy.get('#password').type('incorect');

      cy.get('#login-button').click();

      cy.get('.error').should('contain', 'Wrong credentials');
      cy.get('.error').should('have.css', 'border', '2px solid rgb(255, 0, 0)');
      // cy.get('.error').should('have.css', 'border-style', 'solid');
    });
  });
});

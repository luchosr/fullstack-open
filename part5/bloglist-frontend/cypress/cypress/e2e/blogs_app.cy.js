describe('Blogs app', function () {
  // cy.login es un command de Cypress (parecido a un custom hook )
  // en donde se guarda la lógica de inicio de sesión para usarla en varias partes

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

      // Cypress requiere que los colores se den como rgb.

      // Debido a que todas las pruebas son para el mismo componente al que accedimos usando cy.get, podemos encadenarlos usando and.

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'border', '2px solid rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'luchosr is logged in');
    });
  });

  describe('When log in', function () {
    beforeEach(function () {
      cy.login({ username: 'luchosr', password: 'wordpass' });
    });

    it('A blog can be created', function () {
      cy.contains('Create new Blog').click();
      cy.contains('Create new Blog');

      cy.get('#blogTitle').type('testing the title input');
      cy.get('#blogAuthor').type('Mr BlogAuthor');
      cy.get('#blogUrl').type('www.blogurl.com');

      cy.get('#createNewBlogButton').click();

      cy.get('.success');
    });
  });
});

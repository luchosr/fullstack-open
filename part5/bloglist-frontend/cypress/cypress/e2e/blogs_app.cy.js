describe('Blogs app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173/');
  });

  it('shows Login form correctly', function () {
    cy.contains('User LogIn').click();
  });
});

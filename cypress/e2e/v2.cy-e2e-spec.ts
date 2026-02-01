describe('Version 2', () => {
  it('renders component', () => {
    cy.visit('/v2');
    cy.get('#version-2').should('exist');
  });
});

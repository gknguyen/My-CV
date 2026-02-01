describe('Version 1', () => {
  it('renders component', () => {
    cy.visit('/v1');
    cy.get('#version-1').should('exist');
  });
});

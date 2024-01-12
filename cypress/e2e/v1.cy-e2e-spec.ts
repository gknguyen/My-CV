describe('Version 1', () => {
  it('renders component', () => {
    cy.visit('/');
    cy.get('#detail').should('exist');
  });
});

export {};

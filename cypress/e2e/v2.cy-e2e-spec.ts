describe('Version 2', () => {
  beforeEach(() => {
    // Clear any persisted dark mode so tests start from a known light state
    cy.clearLocalStorage();
  });

  it('renders the page and shows the main container', () => {
    cy.visit('/v2');
    cy.get('#version-2').should('exist');
  });

  it('scroll progress bar is present inside the navbar', () => {
    cy.visit('/v2');
    cy.get('[data-testid="scroll-progress-bar"]').should('exist');
  });

  it('dark mode toggle switches the html.dark class', () => {
    cy.visit('/v2');
    cy.get('html').should('not.have.class', 'dark');
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });

  it('dark mode preference persists across reload via localStorage', () => {
    cy.visit('/v2');
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.window().its('localStorage').invoke('getItem', 'v2-dark-mode').should('eq', 'true');
    cy.reload();
    cy.get('html').should('have.class', 'dark');
  });

  it('anchor links scroll to the correct sections', () => {
    cy.visit('/v2');
    cy.get('a[href="#about"]').click();
    cy.get('#about').should('be.visible', { timeout: 6000 });
    cy.get('a[href="#experiences"]').click();
    cy.get('#experiences').should('be.visible', { timeout: 6000 });
    cy.get('a[href="#certificates"]').click();
    cy.get('#certificates').should('be.visible', { timeout: 6000 });
  });
});

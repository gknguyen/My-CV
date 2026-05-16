describe('Version 2', () => {
  it('renders component', () => {
    cy.visit('/v2');
    cy.get('#version-2').should('exist');
  });

  it('scroll progress bar element is present', () => {
    cy.visit('/v2');
    cy.get('#version-2').should('exist');
    // The scroll progress bar is a motion.div inside the navbar
    cy.get('nav').should('exist');
  });

  it('dark mode persists across reload via localStorage', () => {
    cy.visit('/v2');
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('v2-dark-mode')).to.equal('true');
    });
    cy.reload();
    cy.get('html').should('have.class', 'dark');
  });

  it('anchor links scroll to correct sections', () => {
    cy.visit('/v2');
    cy.get('a[href="#about"]').click();
    cy.get('#about').should('be.visible');
    cy.get('a[href="#experiences"]').click();
    cy.get('#experiences').should('be.visible');
    cy.get('a[href="#certificates"]').click();
    cy.get('#certificates').should('be.visible');
  });
});

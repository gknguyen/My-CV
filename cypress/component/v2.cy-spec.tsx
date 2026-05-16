import { mountWithConfig } from '../config/setup';
import { V2 } from '../../src/views/v2';

describe('Version 2', () => {
  it('renders component', () => {
    mountWithConfig(<V2 />);
    cy.get('#version-2').should('exist');
  });

  it('dark mode toggle adds and removes html.dark class', () => {
    mountWithConfig(<V2 />);
    // Toggle dark mode on
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('have.class', 'dark');
    // Toggle dark mode off
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });

  it('back-to-top button appears after scrolling down', () => {
    mountWithConfig(<V2 />);
    cy.get('[aria-label="Back to top"]').should('not.exist');
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight);
    });
    cy.get('[aria-label="Back to top"]').should('be.visible');
  });

  it('back-to-top button scrolls back to top', () => {
    mountWithConfig(<V2 />);
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight);
    });
    cy.get('[aria-label="Back to top"]').should('be.visible').click();
    cy.window().its('scrollY').should('equal', 0);
  });
});

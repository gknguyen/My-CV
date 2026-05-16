import { mountWithConfig } from '../config/setup';
import { V2 } from '../../src/views/v2';

describe('Version 2', () => {
  beforeEach(() => {
    // Force light mode before each mount so prefers-color-scheme: dark doesn't interfere
    cy.window().then((win) => {
      win.localStorage.setItem('v2-dark-mode', 'false');
      win.document.documentElement.classList.remove('dark');
    });
  });

  it('renders component', () => {
    mountWithConfig(<V2 />);
    cy.get('#version-2').should('exist');
  });

  it('scroll progress bar is present inside the navbar', () => {
    mountWithConfig(<V2 />);
    cy.get('[data-testid="scroll-progress-bar"]').should('exist');
  });

  it('dark mode toggle adds and removes html.dark class', () => {
    mountWithConfig(<V2 />);
    cy.get('html').should('not.have.class', 'dark');
    // Toggle dark mode on
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('have.class', 'dark');
    // Toggle dark mode off
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });

  it('dark mode toggle persists to localStorage', () => {
    mountWithConfig(<V2 />);
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.window().its('localStorage').invoke('getItem', 'v2-dark-mode').should('eq', 'true');
  });

  it('back-to-top button appears after scrolling down', () => {
    mountWithConfig(<V2 />);
    cy.get('[aria-label="Back to top"]').should('not.exist');
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight);
      win.dispatchEvent(new Event('scroll'));
    });
    cy.get('[aria-label="Back to top"]').should('be.visible');
  });

  it('back-to-top button scrolls back to top on click', () => {
    mountWithConfig(<V2 />);
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight);
      win.dispatchEvent(new Event('scroll'));
    });
    cy.get('[aria-label="Back to top"]').should('be.visible').click();
    cy.window().its('scrollY').should('equal', 0);
  });
});

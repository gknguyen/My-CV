import { mountWithConfig } from '../config/setup';
import { V2 } from '../../src/views/v2';

describe('Version 2', () => {
  it('renders component', () => {
    mountWithConfig(<V2 />);
    cy.get('#version-2').should('exist');
  });
});

import React from 'react';
import { mountWithConfig } from '../config/setup';
import { V1 } from '../../src/views/v1';

describe('Version 1', () => {
  it('renders component', () => {
    mountWithConfig(<V1 />);
    cy.get('#detail').should('exist');
  });
});

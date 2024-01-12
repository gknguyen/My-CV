import { mount } from 'cypress/react';
import React from 'react';
import { BrowserRouter } from '../../src/router/component';

export function mountWithConfig(wrappedComponent: React.ReactElement) {
  return mount(<BrowserRouter>{wrappedComponent}</BrowserRouter>);
}

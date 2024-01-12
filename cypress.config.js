import { defineConfig } from 'cypress';
import '@cypress/instrument-cra';

/** https://github.com/cypress-io/code-coverage/tree/master/test-apps/new-cypress-config/cra-e2e-and-ct */
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  includeShadowDom: true,
  video: false,
  env: {
    codeCoverage: {
      exclude: [
        'cypress/**/*.*',
        'src/reportWebVitals.ts',
        'src/setupTests.ts',
        'react-app-env.d.ts',
      ],
    },
  },

  /** https://docs.cypress.io/guides/references/configuration#component */
  component: {
    specPattern: 'cypress/component/**/*.cy-{test,spec}.{js,ts,jsx,tsx}',
    devServer: {
      /** https://docs.cypress.io/guides/component-testing/react/overview#Create-React-App-CRA */
      framework: 'create-react-app',
      bundler: 'webpack',
      scriptsPackageName: 'react-app-rewired',
    },
    setupNodeEvents(on, config) {
      /** https://docs.cypress.io/guides/tooling/code-coverage */
      require('@cypress/code-coverage/task')(on, config);
      /** It's IMPORTANT to return the config object with any changed environment variables */
      return config;
    },
  },

  /** https://docs.cypress.io/guides/references/configuration#e2e */
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy-e2e-{test,spec}.{js,ts,jsx,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
});

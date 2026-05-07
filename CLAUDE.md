# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm ci                  # install dependencies
npm start               # dev server (CRA via craco)
npm run build           # production build
npm run lint            # ESLint
npm run format          # Prettier (formats src/**/*.{ts,tsx})

# Component tests (Cypress)
npm test                # headless
npm run test:w          # interactive (Chrome)
npm run test:cov        # headless + coverage report

# E2E tests (Cypress)
npm run test:e2e        # headless
npm run test:w:e2e      # interactive (Chrome)
npm run test:e2e:cov    # headless + coverage report
```

Run a single test file: open Cypress interactive (`test:w` or `test:w:e2e`) and select the spec manually, or pass `--spec` flag:

```sh
npx cypress run --component --spec "cypress/component/SomeFile.cy.tsx"
```

## Architecture

**Single-page React app** (CRA + craco) that renders a personal CV. Two versioned UI layouts (`v1`, `v2`) share the same data layer.

### Data layer (`src/data/`)

All CV content lives here as plain TypeScript objects — no API calls, no state management library:

- `profile.ts` — personal info, about text, contacts, skills, experience, projects, certificates
- `tech-stack.ts` — tech stack icon lists
- `aws-roadmap.ts` — AWS certification roadmap data

### Router (`src/router/`)

`react-router-dom` v6 with lazy-loaded routes. Both versions are children of the root `App` component:

- `/v1` → `views/v1` (MUI-heavy layout)
- `/v2` → `views/v2` (Tailwind + Headless UI layout)

Root path (`/`) redirects to the default version via `App.tsx`.

### Views (`src/views/`)

- `v1/` — MUI (`@mui/material`) components with `tss-react` styling; uses draggable dialogs
- `v2/` — TailwindCSS + `@headlessui/react` + `@heroicons/react`; features tabbed experience/certificates, paginated projects, and a detail dialog

Each version has its own `common/` folder for shared primitives (components, hooks, types) scoped to that version.

### Shared utilities (`src/shared/`)

- `helper.tsx` — `getTotalYearOfExperience()` and other pure helpers
- `dayjs-with-plugins.ts` — dayjs instance with locale/plugins pre-loaded
- `hooks/useBreakpoint.tsx` — responsive breakpoint hook
- `lazy-load.tsx` — Suspense wrapper for lazy imports

### Testing

- Component tests: `cypress/component/` — Cypress component testing
- E2E specs: `cypress/e2e/` plus root-level `v1.cy-spec.tsx` / `v2.cy-spec.tsx`
- Coverage via `@cypress/code-coverage` + `nyc`

### Build tooling

- `craco` wraps CRA webpack config; `craco.config.js` handles bundle analysis (`BUILD_ANALYZE=true`)
- `@cypress/instrument-cra` instruments code for coverage during `npm start`
- Pre-commit: Husky runs lint/format checks

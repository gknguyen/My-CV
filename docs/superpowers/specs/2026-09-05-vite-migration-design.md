# Migrate My-CV from CRA/craco to Vite + React + TypeScript

## Context

The app is currently built with Create React App wrapped by `craco`
(`@craco/craco`), using `react-scripts` for dev/build and a custom
`craco.config.js` only to conditionally inject `webpack-bundle-analyzer`.
There is no test runner in use (Cypress and all e2e/component tests were
removed in a prior commit; `src/setupTests.ts` is a dead leftover).

Two external dependencies constrain the build output location:

- `server.go` serves static files from `./build` via `http.FileServer`.
- `.github/workflows/s3-deployment.yaml` runs `npm run build` and syncs
  `SOURCE_DIR: "build"` to S3, then invalidates CloudFront.

Both are kept unchanged: Vite's `build.outDir` will be set to `build`.

## Goals

- Replace CRA/craco/react-scripts with Vite as the dev server and
  bundler, with equivalent or better DX (fast HMR, fast cold start).
- Preserve all existing functionality: `/v1` and `/v2` routed views,
  dark mode, lazy loading, MUI/Tailwind styling, bundle analyzer.
- Keep the deploy pipeline (`server.go`, GitHub Actions workflow)
  untouched — build output stays at `build/`.
- Modernize the pieces that were CRA-coupled (ESLint config, env var
  handling, HTML templating, TS config) rather than papering over them.

## Non-goals

- No test runner is being introduced (none exists today).
- No path-alias / `vite-tsconfig-paths` setup (no aliases exist today).
- No change to `server.go`, the S3 deploy workflow, or the domain
  metadata mechanism beyond hardcoding the one static OG value.
- No dependency upgrades beyond what's required for the migration
  (MUI, Tailwind, framer-motion, etc. stay at their current versions).

## Design

### 1. Dependencies

Remove (devDependencies):
- `react-scripts`
- `@craco/craco`
- `webpack-bundle-analyzer`
- `@types/webpack-bundle-analyzer`
- `@babel/plugin-proposal-private-property-in-object`

Add (devDependencies):
- `vite`
- `@vitejs/plugin-react-swc` — SWC-based React plugin. No Babel macros
  or plugins are in use anywhere in the codebase (MUI, tss-react,
  emotion, and framer-motion all work with pure SWC transforms), so
  the faster SWC variant is preferred over `@vitejs/plugin-react`.
- `vite-plugin-checker` — surfaces TypeScript errors in the dev
  overlay; `vite build` alone only transpiles and would otherwise ship
  type errors silently.
- `rollup-plugin-visualizer` — replaces `webpack-bundle-analyzer` for
  the `build:analyze` script.
- ESLint stack (see §4): `eslint`, `typescript-eslint`,
  `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, plus
  whatever `@eslint/js` base config `typescript-eslint` recommends.

### 2. Config files

**`vite.config.ts`** (new, replaces `craco.config.js`):
- `plugins: [react(), checker({ typescript: true })]`
- `build.outDir: 'build'`
- `build.sourcemap: false`
- Bundle visualizer plugin added conditionally when
  `process.env.BUILD_ANALYZE === 'true'`, `analyzerMode`-equivalent
  static HTML report, not opened automatically (matches current
  craco behavior: `analyzerMode: 'static', openAnalyzer: false`).

**`tsconfig.json`** (rewritten for Vite/bundler mode):
- `target: "ES2020"`, `lib: ["ES2020", "DOM", "DOM.Iterable"]`
- `module: "ESNext"`, `moduleResolution: "bundler"`
- `types: ["vite/client"]`
- Keep: `jsx: "react-jsx"`, `strict`, `esModuleInterop`,
  `resolveJsonModule`, `isolatedModules`, `noEmit: true` (the `build`
  script's `tsc -b` step is for type-checking only — Vite does the
  actual emit — so `noEmit: true` stays correct for the app tsconfig).
  A separate `tsconfig.node.json` handles `vite.config.ts`.
- `include: ["src"]`, add a `references` entry to `tsconfig.node.json`.

**`tsconfig.node.json`** (new, standard Vite React+TS template split):
- Covers `vite.config.ts` only, with Node-appropriate
  `module`/`moduleResolution`/`types: ["node"]` settings.

**`index.html`** (moved from `public/index.html` to project root):
- Add `<script type="module" src="/src/index.tsx"></script>` before
  `</body>`.
- Replace all `%PUBLIC_URL%/...` references with `/...` (Vite serves
  `public/` at the root automatically).
- Replace `%REACT_APP_DOMAIN%` (used in `og:url` / `og:image`) with
  the literal `https://gknguyen.info` — this is static marketing
  metadata, not a value that changes across environments, so hardcoding
  it avoids adding a custom `transformIndexHtml` plugin for one string.

**`public/`** directory (icons, images, resumes): stays exactly where
it is; already-relative-to-root asset references in `src/` need no
changes since Vite serves `public/` at `/` just like CRA did.

### 3. Source changes

- `src/react-app-env.d.ts` → delete, replace with `src/vite-env.d.ts`
  containing `/// <reference types="vite/client" />`.
- `src/data/profile.ts`: `process.env.REACT_APP_DOMAIN` →
  `import.meta.env.VITE_APP_DOMAIN`.
- `src/setupTests.ts`: delete (dead file — no test runner is
  configured after Cypress/e2e removal; nothing imports it).
- `src/reportWebVitals.ts`, `src/index.tsx`: no changes — these use
  standard `ReactDOM.createRoot` and a plain dynamic `import('web-vitals')`,
  neither of which are CRA-specific.
- No other files reference `process.env.*`, `%PUBLIC_URL%`, or other
  CRA-only globals (confirmed via repo-wide grep).

### 4. ESLint migration

Current `.eslintrc` extends `react-app`, a config package that ships
as part of the CRA toolchain and disappears once `react-scripts` is
removed. Replace with a flat `eslint.config.js` (current ESLint
standard, and the shape used by Vite's own React+TS templates):
- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` recommended rules
- `eslint-plugin-react-refresh` (flags exports that break Fast Refresh)
- Preserve the two custom rules from the current config:
  `import/no-default-export: error` and `react-hooks/exhaustive-deps: warn`
  (the former needs `eslint-plugin-import` kept as a dependency since
  it isn't part of the new base configs).
- `npm run lint` keeps its current invocation shape (`eslint ./src`),
  `.lintstagedrc.cjs` and husky hooks need no changes.

### 5. package.json scripts

| Old | New |
|---|---|
| `start: craco start` | `dev: vite` |
| `build: craco build` | `build: tsc -b && vite build` |
| `build:analyze: BUILD_ANALYZE=true craco build` | `build:analyze: BUILD_ANALYZE=true vite build` |
| `eject: craco eject` | removed (meaningless without CRA) |
| — | `preview: vite preview` (new — smoke-test the prod bundle locally) |

Drop the `browserslist` field — Vite doesn't consume it (no
`@vitejs/plugin-legacy` is being added).

### 6. Env vars

`.env` changes:
- Remove `DISABLE_ESLINT_PLUGIN`, `INLINE_RUNTIME_CHUNK`,
  `SKIP_PREFLIGHT_CHECK`, `GENERATE_SOURCEMAP` (CRA-only; superseded
  by `vite.config.ts`'s `build.sourcemap: false` or simply irrelevant).
- Rename `REACT_APP_DOMAIN` → `VITE_APP_DOMAIN` (Vite only exposes
  `VITE_`-prefixed vars to client code).

`.gitignore` already ignores `build/`; no changes needed there (no
`dist/` output to worry about since `outDir` stays `build`).

## Testing/Verification

- `npm run dev` — click through `/v1` and `/v2`, confirm dark mode
  toggle, lazy-loaded routes, and project pagination all work.
- `npm run build && npm run preview` — confirm the production bundle
  loads and behaves the same as dev.
- `npm run lint` — confirm the new flat config runs clean (or with the
  same pre-existing warnings, if any).
- Confirm `build/` output layout is still what `server.go`'s
  `http.FileServer(http.Dir("./build"))` expects (flat static files,
  `index.html` at the root of `build/`).

## Risks / open questions

- None outstanding — scope was narrowed during brainstorming to avoid
  path aliases, test runners, and CI/deploy changes since none of
  those exist or are in scope today.

# Vite Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace CRA/craco/react-scripts with Vite as the dev server and bundler for My-CV, with zero functional regressions and zero changes to the deploy pipeline (`server.go`, GitHub Actions).

**Architecture:** Swap the toolchain layer only — `vite.config.ts` replaces `craco.config.js`, a root `index.html` replaces `public/index.html`, `tsconfig.json` moves to bundler mode. Application source (`src/`) is untouched except for the two CRA-specific globals (`process.env.REACT_APP_DOMAIN`, CRA's ambient type file) and one dead file.

**Tech Stack:** Vite, `@vitejs/plugin-react-swc`, `vite-plugin-checker`, `rollup-plugin-visualizer`, ESLint 9 flat config (`typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-import`).

**Spec:** `docs/superpowers/specs/2026-09-05-vite-migration-design.md`

## Global Constraints

- `build.outDir` MUST stay `build` — `server.go` and `.github/workflows/s3-deployment.yaml` both hardcode this path.
- No test runner is being introduced (none exists today).
- No path aliases are being introduced (none exist today).
- No changes to `server.go` or `.github/workflows/s3-deployment.yaml`.
- No dependency version bumps beyond what the migration requires (MUI, Tailwind, framer-motion, react-router-dom stay as-is).

---

### Task 1: Swap toolchain dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `node_modules` containing `vite`, `@vitejs/plugin-react-swc`, `vite-plugin-checker`, `rollup-plugin-visualizer`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-import`, `globals` — all later tasks assume these are installed.

- [ ] **Step 1: Remove CRA-only dependencies from `package.json`**

Delete these entries from `devDependencies`:
```json
"@craco/craco": "^7.1.0",
"@babel/plugin-proposal-private-property-in-object": "^7.21.11",
"@types/webpack-bundle-analyzer": "^4.7.0",
```
and from `dependencies`, remove the `react-scripts` line if it appears there instead (check both blocks — currently it's `"react-scripts": "^5.0.1"` in `devDependencies`). Also remove `"webpack-bundle-analyzer": "^5.2.0"` from `devDependencies`.

- [ ] **Step 2: Add Vite + ESLint devDependencies to `package.json`**

Add to `devDependencies` (alphabetical order, matching existing style):
```json
"@eslint/js": "^9.0.0",
"@vitejs/plugin-react-swc": "^3.7.0",
"eslint": "^9.0.0",
"eslint-plugin-import": "^2.29.0",
"eslint-plugin-react-hooks": "^5.0.0",
"eslint-plugin-react-refresh": "^0.4.0",
"globals": "^15.0.0",
"rollup-plugin-visualizer": "^5.12.0",
"typescript-eslint": "^8.0.0",
"vite": "^5.4.0",
"vite-plugin-checker": "^0.8.0"
```
(Use whatever the latest published minor/patch is — these are floors, not pins; `npm install` will resolve exact versions into `package-lock.json`.)

- [ ] **Step 3: Install**

Run: `npm install`
Expected: exits 0, `package-lock.json` is updated, no `ERESOLVE` peer-dependency errors.

- [ ] **Step 4: Verify the packages resolved**

Run: `npm ls vite @vitejs/plugin-react-swc vite-plugin-checker rollup-plugin-visualizer typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-import globals @eslint/js eslint`
Expected: every package listed with a resolved version, no `(empty)` / `UNMET DEPENDENCY` lines.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "Swap CRA/craco toolchain deps for Vite + ESLint 9"
```

---

### Task 2: Core Vite toolchain (config, tsconfig, HTML entry, scripts)

**Files:**
- Create: `vite.config.ts`
- Create: `tsconfig.node.json`
- Create: `index.html` (project root)
- Create: `src/vite-env.d.ts`
- Modify: `tsconfig.json`
- Modify: `package.json` (scripts + `browserslist` field)
- Delete: `craco.config.js`
- Delete: `public/index.html`
- Delete: `src/react-app-env.d.ts`

**Interfaces:**
- Consumes: `vite`, `@vitejs/plugin-react-swc`, `vite-plugin-checker`, `rollup-plugin-visualizer` from Task 1.
- Produces: a working `npm run dev` / `npm run build` / `npm run preview` cycle that later tasks (env var rename, ESLint) build on top of.

- [ ] **Step 1: Create `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

const plugins: PluginOption[] = [react(), checker({ typescript: true })];

if (process.env.BUILD_ANALYZE === 'true') {
  plugins.push(
    visualizer({
      filename: 'build/bundle-analysis.html',
      open: false,
    }),
  );
}

export default defineConfig({
  plugins,
  build: {
    outDir: 'build',
    sourcemap: false,
  },
});
```

- [ ] **Step 2: Rewrite `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite/client"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Delete `public/index.html`, create `index.html` at the project root**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Personal portfolio and CV site" />

    <link rel="icon" href="/images/coding.png" />
    <link rel="apple-touch-icon" href="/images/coding.png" />

    <!-- Material-table-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

    <title>GK Nguyen – Fullstack Engineer | MERN Stack Developer (Typescript, AWS)</title>
    <meta
      name="description"
      content="Fullstack Engineer specializing in Typescript, NestJS, React.js, AWS, Kubernetes, and distributed systems. Portfolio, projects, and blog."
    />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta
      property="og:title"
      content="GK Nguyen – Fullstack Engineer | MERN Stack Developer (Typescript, AWS)"
    />
    <meta
      property="og:description"
      content="Fullstack Engineer specializing in Typescript, NestJS, React.js, AWS, Kubernetes, and distributed systems. Portfolio, projects, and blog."
    />
    <meta property="og:url" content="https://gknguyen.info" />
    <meta property="og:image" content="https://gknguyen.info/images/gk.jpg" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `src/vite-env.d.ts`, delete `src/react-app-env.d.ts`**

`src/vite-env.d.ts`:
```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 6: Delete `craco.config.js`**

- [ ] **Step 7: Update `package.json` scripts and drop `browserslist`**

Replace the `scripts` block with:
```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "build:analyze": "BUILD_ANALYZE=true vite build",
  "preview": "vite preview",
  "format": "prettier --write ./src/**/*.{ts,tsx}",
  "lint": "eslint src",
  "prepare": "husky"
}
```
Remove the top-level `"browserslist": { ... }` field entirely (Vite doesn't consume it).

- [ ] **Step 8: Verify dev server boots**

Run: `npm run dev -- --port 5173 &` then `sleep 2 && curl -sf http://localhost:5173/ | grep -q '<div id="root">' && echo OK`
Expected: prints `OK`. Kill the dev server afterward (`kill %1`).

- [ ] **Step 9: Verify production build + preview**

Run: `npm run build`
Expected: exits 0, produces `build/index.html` and `build/assets/*`.

Run: `npm run preview -- --port 5174 &` then `sleep 2 && curl -sf http://localhost:5174/ | grep -q '<div id="root">' && echo OK`
Expected: prints `OK`. Kill the preview server afterward (`kill %1`).

- [ ] **Step 10: Commit**

```bash
git add vite.config.ts tsconfig.json tsconfig.node.json index.html src/vite-env.d.ts package.json
git rm craco.config.js public/index.html src/react-app-env.d.ts
git commit -m "Replace craco/CRA toolchain with Vite"
```

---

### Task 3: Env var rename and dead file cleanup

**Files:**
- Modify: `.env`
- Modify: `src/data/profile.ts:3`
- Delete: `src/setupTests.ts`

**Interfaces:**
- Consumes: `import.meta.env` typing from `src/vite-env.d.ts` (Task 2).

- [ ] **Step 1: Update `.env`**

Replace the full file contents with:
```
VITE_APP_DOMAIN=https://gknguyen.info
```
(This drops `DISABLE_ESLINT_PLUGIN`, `INLINE_RUNTIME_CHUNK`, `SKIP_PREFLIGHT_CHECK`, `GENERATE_SOURCEMAP` — all CRA-only and superseded by `vite.config.ts`'s `build.sourcemap: false`.)

- [ ] **Step 2: Update `src/data/profile.ts:3`**

Change:
```typescript
const APP_DOMAIN = process.env.REACT_APP_DOMAIN;
```
to:
```typescript
const APP_DOMAIN = import.meta.env.VITE_APP_DOMAIN;
```

- [ ] **Step 3: Delete `src/setupTests.ts`**

It's a dead file (no test runner configured after Cypress/e2e removal; nothing imports it).

- [ ] **Step 4: Verify no CRA-era env references remain**

Run: `grep -rn "process\.env\.\|REACT_APP_" src`
Expected: no output.

- [ ] **Step 5: Verify the domain renders correctly**

Run: `npm run build && grep -q "gknguyen.info" build/assets/*.js && echo OK`
Expected: prints `OK` — confirms `VITE_APP_DOMAIN` was inlined into the built bundle.

- [ ] **Step 6: Commit**

```bash
git add .env src/data/profile.ts
git rm src/setupTests.ts
git commit -m "Rename REACT_APP_DOMAIN to VITE_APP_DOMAIN, drop dead setupTests.ts"
```

---

### Task 4: ESLint flat config migration

**Files:**
- Create: `eslint.config.js`
- Delete: `.eslintrc`

**Interfaces:**
- Consumes: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-import`, `globals` from Task 1.
- Produces: `npm run lint` (invoked by `.lintstagedrc.cjs` and husky's pre-commit hook — neither needs changes since both just shell out to `eslint --fix <files>` / `npm run lint`).

- [ ] **Step 1: Delete `.eslintrc`**

- [ ] **Step 2: Create `eslint.config.js`**

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['build', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.recommended.rules,
      'import/no-default-export': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
);
```

- [ ] **Step 3: Run lint and reconcile any plugin API drift**

Run: `npm run lint`

`npm install` in Task 1 resolves whatever the latest published versions of these plugins are, and their flat-config export shape has changed across minor versions (e.g. `eslint-plugin-react-hooks`'s recommended flat preset has been exported under different property names across 5.x releases). If the run fails with an error about `reactHooks.configs.recommended` (or `reactRefresh.configs.recommended`) being undefined:

1. Run `node -e "console.log(Object.keys(require('eslint-plugin-react-hooks').configs))"` (and the equivalent for `eslint-plugin-react-refresh`) to list the actual exported config keys.
2. Swap `reactHooks.configs.recommended.rules` / `reactRefresh.configs.recommended.rules` in `eslint.config.js` for whichever key that output shows (commonly `recommended-latest` for flat-config-native releases).

Expected after reconciliation: `npm run lint` exits 0, or exits non-zero only with warnings/errors that are genuine pre-existing code issues (not config errors).

- [ ] **Step 4: Commit**

```bash
git add eslint.config.js
git rm .eslintrc
git commit -m "Migrate ESLint config to flat config, drop CRA's react-app preset"
```

---

### Task 5: Final verification pass

**Files:** none (verification only)

**Interfaces:** none — this task exercises the full app built by Tasks 1-4.

- [ ] **Step 1: Full dev server click-through**

Run: `npm run dev`, open the printed local URL in a browser.
Check manually:
- `/v1` loads (MUI layout), draggable dialogs open.
- `/v2` loads (Tailwind layout), dark mode toggle persists across reload (`localStorage('v2-dark-mode')`), scroll progress bar and back-to-top FAB appear, paginated project list transitions animate.
- Root `/` redirects to the default version.

Stop the dev server (Ctrl-C) when done.

- [ ] **Step 2: Production build + preview parity check**

Run: `npm run build && npm run preview`, open the printed local URL.
Check manually: same `/v1` and `/v2` behavior as Step 1, no console errors.

Stop the preview server (Ctrl-C) when done.

- [ ] **Step 3: Confirm `build/` layout matches what `server.go` expects**

Run: `ls build/` and `cat build/index.html | head -5`
Expected: `build/index.html` exists at the top level (not nested in a subfolder), alongside an `assets/` directory and the copied contents of `public/` (`icons/`, `images/`, `resumes/`) — this is the flat layout `http.FileServer(http.Dir("./build"))` in `server.go` requires.

- [ ] **Step 4: Full lint pass**

Run: `npm run lint`
Expected: exits 0 (or only pre-existing warnings, per Task 4's reconciliation step).

- [ ] **Step 5: Commit (only if any verification step required a fix)**

If Steps 1-4 were all clean, there's nothing to commit — this task is verification-only. If a fix was needed, commit it with a message describing what broke and why (e.g. `git commit -m "Fix dark-mode class toggle broken by index.html script tag placement"`).

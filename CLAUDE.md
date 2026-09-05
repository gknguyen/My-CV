# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm ci                  # install dependencies
npm start               # dev server (CRA via craco)
npm run build           # production build
npm run lint            # ESLint
npm run format          # Prettier (formats src/**/*.{ts,tsx})
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
- `v2/` — TailwindCSS + `@headlessui/react` + `@heroicons/react` + `framer-motion`; features:
  - Physics-based animations via Framer Motion (`useInView`, `AnimatePresence`, `whileHover`)
  - Dark mode toggle (persisted in `localStorage('v2-dark-mode')`), enabled via `darkMode: 'class'` in Tailwind
  - Scroll progress bar and back-to-top FAB
  - Active nav link highlighting based on scroll position
  - Paginated project list with animated page transitions
  - Modern modal dialog for project details

Each version has its own `common/` folder for shared primitives (components, hooks, types) scoped to that version.

#### V2 new files

| File | Purpose |
|---|---|
| `src/views/v2/common/useDarkMode.tsx` | Dark mode hook — reads `localStorage`, toggles `html.dark` class |
| `src/views/v2/common/useActiveSection.tsx` | IntersectionObserver hook — returns active section id for nav highlighting |
| `src/views/v2/common/animate-presence.tsx` | Thin shim around framer-motion `AnimatePresence` for React 18 JSX types |
| `src/views/v2/common/icon/svg.tsx` | Custom inline SVG components (LinkedIn, GitHub, Facebook) |
| `src/views/v2/components/scroll-progress-bar.tsx` | Scroll progress bar rendered inside the sticky Navbar |
| `src/views/v2/components/back-to-top.tsx` | Fixed FAB that appears after scrolling past 50% of viewport height |

#### V2 CSS conventions (`src/views/v2/style.css`)

All dark-mode overrides live in `style.css` using `!important` to beat MT's internal styles. Key classes:

| Class | Purpose |
|---|---|
| `v2-card-wrapper` | Outer gradient wrapper for cards (dark mode gradient applied here) |
| `v2-card` | Inner MT `Card` forced transparent in dark mode |
| `v2-tab-indicator` | Sliding active-tab indicator background (passed via MT's `indicatorProps`) |
| `v2-pagination-btn` | Prev/next pagination buttons — dark background forced via CSS |
| `v2-plus-enter` | CSS keyframe (`slideUpFade`) for the project PlusIcon entrance animation |

> **MT dark mode caveat:** `@material-tailwind/react` applies many styles with `!important`. All V2 dark-mode overrides must be in `style.css` with `!important`; Tailwind `dark:` prefix classes alone are not sufficient for MT-managed elements.

### Shared utilities (`src/shared/`)

- `helper.tsx` — `getTotalYearOfExperience()` and other pure helpers
- `dayjs-with-plugins.ts` — dayjs instance with locale/plugins pre-loaded
- `hooks/useBreakpoint.tsx` — responsive breakpoint hook
- `lazy-load.tsx` — Suspense wrapper for lazy imports

### Build tooling

- `craco` wraps CRA webpack config; `craco.config.js` handles bundle analysis (`BUILD_ANALYZE=true`)
- Pre-commit: Husky runs lint/format checks

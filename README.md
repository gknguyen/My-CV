# My-CV

a small project for my CV

## Technical Approach

- Base template: [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html)
- Programming language: [Typescript](https://www.typescriptlang.org/)
- Core: [ReactJS](https://react.dev/)
- CSS: [TailwindCSS](https://tailwindcss.com/)
- Route manager: [react-router-dom](https://reactrouter.com/en/main)
- Formatter: [Prettier](https://prettier.io/)
- Code quality scanner: [Eslint](https://eslint.org/)
- Pre-commit checker: [Husky](https://typicode.github.io/husky/)
- Testing: [Cypress](https://www.cypress.io/)

## Installation

```bash
npm ci
```

- Note: If you receive `old lockfile The package-lock.json file was created with an old version of npm`, run this script to fix

```bash
npm i --package-lock-only
```

- upgrade dependencies

```bash
npm outdated
npm update -S
```

## Test

1. all tests

```bash
npm test
npm run test:w
npm run test:e2e
npm run test:e2e:w
```

2. coverage

```bash
npm run test:cov
npm run test:e2e:cov
```

# Deployment

https://d3amstao1e69wj.cloudfront.net

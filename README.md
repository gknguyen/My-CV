# My-CV

a small project for my CV

## Technical Stack

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

```sh
npm ci
```

## Start application

### Development build

```sh
npm start
```

### Production build

```sh
npm run build
npm install -g serve
serve -s build
```

## Test

### unit tests

```sh
npm test
npm run test:w
npm run test:cov
```

### e2e tests

```sh
npm run test:e2e
npm run test:e2e:w
npm run test:e2e:cov
```

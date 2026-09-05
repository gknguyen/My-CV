# My-CV

a small project for my CV

## Technical Stack

- Build tool: [Vite](https://vitejs.dev/)
- Programming language: [Typescript](https://www.typescriptlang.org/)
- Core: [ReactJS](https://react.dev/)
- CSS: [TailwindCSS](https://tailwindcss.com/)
- Route manager: [react-router-dom](https://reactrouter.com/en/main)
- Formatter: [Prettier](https://prettier.io/)
- Code quality scanner: [Eslint](https://eslint.org/)
- Pre-commit checker: [Husky](https://typicode.github.io/husky/)

## Installation

```sh
npm ci
```

## Start application

### Development build

```sh
npm run dev
```

### Production build

```sh
npm run build
npm run preview
```

Deployed automatically to AWS S3/CloudFront on push to `master` (see `.github/workflows/s3-deployment.yaml`). A standalone Go static server (`server.go`) is also available for self-hosting the `build/` output.

## Reference

- <https://techicons.dev>
- <https://aws-icons.com>

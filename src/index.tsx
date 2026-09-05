import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './router/component';
import { router } from './router/routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

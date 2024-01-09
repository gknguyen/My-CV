import React from 'react';
import { ROUTE_V1 } from './routes';
import { useLocation, useNavigate } from './hook';

export { BrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

export const AutoNavigateRoutes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/') navigate(ROUTE_V1, { replace: true });
  }, [location.pathname]);

  return <></>;
};

import React from 'react';
import { Outlet } from '../router/component';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTE_V1 } from '../router/routes';

export const App: React.FC = () => {
  const location = useLocation();

  const autoNavigateRoutes = React.useCallback(() => {
    if (location.pathname === '/') return <Navigate to={ROUTE_V1} replace />;
    return <Outlet />;
  }, [location.pathname]);

  return <div>{autoNavigateRoutes()}</div>;
};

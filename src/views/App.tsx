import { FC, useCallback } from 'react';
import { Navigate, Outlet } from '../router/component';
import { useLocation } from '../router/hook';
import { ROUTE_V2 } from '../router/routes';

export const App: FC = () => {
  const location = useLocation();

  const autoNavigateRoutes = useCallback(() => {
    if (location.pathname === '/') return <Navigate to={ROUTE_V2} replace />;
    return <Outlet />;
  }, [location.pathname]);

  return <div>{autoNavigateRoutes()}</div>;
};

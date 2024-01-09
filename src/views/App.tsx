import React from 'react';
import { AutoNavigateRoutes, Outlet } from '../router/component';

export const App: React.FC = () => {
  return (
    <div>
      <AutoNavigateRoutes />
      <Outlet />
    </div>
  );
};

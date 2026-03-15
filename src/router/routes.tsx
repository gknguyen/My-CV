import { ROUTE_V1, ROUTE_V2 } from './const';
import { createBrowserRouter } from './helper';
import { RouteObject } from './interface';

export const routes: RouteObject[] = [
  {
    path: `/`,
    lazy: () =>
      import('../views/App').then((m) => ({
        Component: m.App,
      })),
    children: [
      {
        path: ROUTE_V1,
        lazy: () =>
          import('../views/v1').then((m) => ({
            Component: m.V1,
          })),
      },
      {
        path: ROUTE_V2,
        lazy: () =>
          import('../views/v2').then((m) => ({
            Component: m.V2,
          })),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

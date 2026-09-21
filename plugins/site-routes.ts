import { ROUTE_V1, ROUTE_V2 } from '../src/router/const.js';

export type SiteRoute = {
  path: string;
  renderUrl?: string;
};

export const SITE_ROUTES: SiteRoute[] = [
  { path: '/', renderUrl: ROUTE_V2 },
  { path: ROUTE_V1 },
  { path: ROUTE_V2 },
];

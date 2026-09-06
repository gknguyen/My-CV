import createCache from '@emotion/cache';
import { renderToString } from 'react-dom/server';
import { Route, Routes, StaticRouter } from 'react-router';
import { TssCacheProvider } from 'tss-react';
import { ROUTE_V1, ROUTE_V2 } from './router/const';
import { App } from './views/App';
import { V1 } from './views/v1';
import { V2 } from './views/v2';

export function render(url: string): string {
  const tssCache = createCache({ key: 'tss' });

  return renderToString(
    <TssCacheProvider value={tssCache}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path={ROUTE_V1.slice(1)} element={<V1 />} />
            <Route path={ROUTE_V2.slice(1)} element={<V2 />} />
          </Route>
        </Routes>
      </StaticRouter>
    </TssCacheProvider>,
  );
}

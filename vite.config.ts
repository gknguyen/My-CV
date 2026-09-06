import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import { aeoPlugin } from './plugins/aeo/index.js';
import { seoPlugin } from './plugins/seo/index.js';
import { ssgPlugin } from './plugins/ssg/index.js';

// eslint-disable-next-line import-x/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const plugins: PluginOption[] = [
    react(),
    checker({ typescript: true }),
    aeoPlugin({ siteUrl: env.VITE_APP_DOMAIN }),
    seoPlugin({ siteUrl: env.VITE_APP_DOMAIN }),
    ssgPlugin({ entry: 'src/entry-server.tsx', routes: ['/v1', '/v2'] }),
  ];

  if (process.env.BUILD_ANALYZE === 'true') {
    plugins.push(
      visualizer({
        filename: 'build/bundle-analysis.html',
        open: false,
      }) as PluginOption,
    );
  }

  return {
    plugins,
    build: {
      outDir: 'build',
      sourcemap: false,
      // `@material-tailwind/react` is CJS-only and bundles its own nested
      // `framer-motion`/`@floating-ui` copies, landing its whole async chunk
      // around ~680 kB. It's already split off from the initial v1/v2 route
      // chunks and only loads on demand, so raise the warning threshold
      // instead of forcing an artificial split of one already-isolated chunk.
      chunkSizeWarningLimit: 750,
    },
    ssr: {
      noExternal: ['@material-tailwind/react'],
    },
  };
});

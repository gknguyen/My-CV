import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import { aeoPlugin } from './plugins/aeo';
import { seoPlugin } from './plugins/seo';

// eslint-disable-next-line import-x/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const plugins: PluginOption[] = [
    react(),
    checker({ typescript: true }),
    aeoPlugin({ siteUrl: env.VITE_APP_DOMAIN }),
    seoPlugin({ siteUrl: env.VITE_APP_DOMAIN }),
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
    },
  };
});

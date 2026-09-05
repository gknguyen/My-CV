import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

const plugins: PluginOption[] = [react(), checker({ typescript: true })];

if (process.env.BUILD_ANALYZE === 'true') {
  plugins.push(
    visualizer({
      filename: 'build/bundle-analysis.html',
      open: false,
    }) as PluginOption,
  );
}

// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
  plugins,
  build: {
    outDir: 'build',
    sourcemap: false,
  },
});

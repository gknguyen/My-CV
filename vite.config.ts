import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

const plugins: PluginOption[] = [react(), checker({ typescript: true })];

if (process.env.BUILD_ANALYZE === 'true') {
  plugins.push(
    visualizer({
      filename: 'build/bundle-analysis.html',
      open: false,
    }) as PluginOption,
  );
}

export default defineConfig({
  plugins,
  build: {
    outDir: 'build',
    sourcemap: false,
  },
});

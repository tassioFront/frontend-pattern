import { defineConfig } from 'vitest/config';
import { splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';

const VISUALIZER = true; // change to see the current bundle.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    /**
     * See more here: https://vitejs.dev/guide/build.html#chunking-strategy
     */
    splitVendorChunkPlugin(),
    /**
     * See more here: https://www.npmjs.com/package/rollup-plugin-visualizer
     */
    // @ts-expect-error
    VISUALIZER &&
      visualizer({
        open: true,
        gzipSize: true,
        filename: 'chunks-report.html',
      }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: true,
    outDir: './build',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a chunk to @open-ish deps. Reducing the vendor chunk size
          if (id.includes('@open-ish') || id.includes('tslib')) {
            return '@open-ish';
          }
          // creating a chunk to react routes deps. Reducing the vendor chunk size
          if (
            id.includes('react-router-dom') ||
            id.includes('@remix-run') ||
            id.includes('react-router')
          ) {
            return '@react-router';
          }
        },
      },
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

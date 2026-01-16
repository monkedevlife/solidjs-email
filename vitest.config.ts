import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin({
      ssr: true,
    }),
  ],
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    conditions: ['node', 'solid'],
    alias: {
      '@solidjs-email/render': resolve(__dirname, 'packages/render/src/index.ts'),
      '@solidjs-email/html': resolve(__dirname, 'packages/html/src/index.ts'),
      '@solidjs-email/head': resolve(__dirname, 'packages/head/src/index.ts'),
      '@solidjs-email/body': resolve(__dirname, 'packages/body/src/index.ts'),
      '@solidjs-email/tailwind': resolve(__dirname, 'packages/tailwind/src/index.ts'),
      '@solidjs-email/components': resolve(__dirname, 'packages/components/src/index.ts'),
    },
  },
});

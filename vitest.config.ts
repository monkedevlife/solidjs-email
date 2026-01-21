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
      '@solidjs-email/button': resolve(__dirname, 'packages/button/src/index.ts'),
      '@solidjs-email/code-inline': resolve(__dirname, 'packages/code-inline/src/index.ts'),
      '@solidjs-email/code-block': resolve(__dirname, 'packages/code-block/src/index.ts'),
      '@solidjs-email/container': resolve(__dirname, 'packages/container/src/index.ts'),
      '@solidjs-email/section': resolve(__dirname, 'packages/section/src/index.ts'),
      '@solidjs-email/row': resolve(__dirname, 'packages/row/src/index.ts'),
      '@solidjs-email/column': resolve(__dirname, 'packages/column/src/index.ts'),
      '@solidjs-email/text': resolve(__dirname, 'packages/text/src/index.ts'),
      '@solidjs-email/link': resolve(__dirname, 'packages/link/src/index.ts'),
      '@solidjs-email/heading': resolve(__dirname, 'packages/heading/src/index.ts'),
      '@solidjs-email/img': resolve(__dirname, 'packages/img/src/index.ts'),
      '@solidjs-email/hr': resolve(__dirname, 'packages/hr/src/index.ts'),
      '@solidjs-email/preview': resolve(__dirname, 'packages/preview/src/index.ts'),
      '@solidjs-email/dev-server': resolve(__dirname, 'packages/dev-server/src/index.ts'),
      '@solidjs-email/font': resolve(__dirname, 'packages/font/src/index.ts'),
      '@solidjs-email/markdown': resolve(__dirname, 'packages/markdown/src/index.ts'),
      '@solidjs-email/main': resolve(__dirname, 'packages/solidjs-email/src/index.ts'),
    },
  },
});

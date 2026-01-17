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
      '@monkedevlife/solidjs-email-render': resolve(__dirname, 'packages/render/src/index.ts'),
      '@monkedevlife/solidjs-email-html': resolve(__dirname, 'packages/html/src/index.ts'),
      '@monkedevlife/solidjs-email-head': resolve(__dirname, 'packages/head/src/index.ts'),
      '@monkedevlife/solidjs-email-body': resolve(__dirname, 'packages/body/src/index.ts'),
      '@monkedevlife/solidjs-email-tailwind': resolve(__dirname, 'packages/tailwind/src/index.ts'),
      '@monkedevlife/solidjs-email-components': resolve(__dirname, 'packages/components/src/index.ts'),
      '@monkedevlife/solidjs-email-button': resolve(__dirname, 'packages/button/src/index.ts'),
      '@monkedevlife/solidjs-email-container': resolve(__dirname, 'packages/container/src/index.ts'),
      '@monkedevlife/solidjs-email-section': resolve(__dirname, 'packages/section/src/index.ts'),
      '@monkedevlife/solidjs-email-row': resolve(__dirname, 'packages/row/src/index.ts'),
      '@monkedevlife/solidjs-email-column': resolve(__dirname, 'packages/column/src/index.ts'),
      '@monkedevlife/solidjs-email-text': resolve(__dirname, 'packages/text/src/index.ts'),
      '@monkedevlife/solidjs-email-link': resolve(__dirname, 'packages/link/src/index.ts'),
      '@monkedevlife/solidjs-email-heading': resolve(__dirname, 'packages/heading/src/index.ts'),
      '@monkedevlife/solidjs-email-img': resolve(__dirname, 'packages/img/src/index.ts'),
      '@monkedevlife/solidjs-email-hr': resolve(__dirname, 'packages/hr/src/index.ts'),
      '@monkedevlife/solidjs-email-preview': resolve(__dirname, 'packages/preview/src/index.ts'),
      '@monkedevlife/solidjs-email-dev-server': resolve(__dirname, 'packages/dev-server/src/index.ts'),
      '@monkedevlife/solidjs-email-font': resolve(__dirname, 'packages/font/src/index.ts'),
      '@monkedevlife/solidjs-email-markdown': resolve(__dirname, 'packages/markdown/src/index.ts'),
    },
  },
});

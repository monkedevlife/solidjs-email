import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const packagesDir = resolve(__dirname, '../../packages');

export default defineConfig({
  plugins: [solidPlugin({ ssr: true })],
  resolve: {
    alias: {
      '@monkedevlife/solidjs-email-components': resolve(packagesDir, 'components/src/index.ts'),
      '@monkedevlife/solidjs-email-render': resolve(packagesDir, 'render/src/index.ts'),
      '@monkedevlife/solidjs-email-tailwind': resolve(packagesDir, 'tailwind/src/index.ts'),
      '@solidjs-email/body': resolve(packagesDir, 'body/src/index.ts'),
      '@solidjs-email/button': resolve(packagesDir, 'button/src/index.ts'),
      '@solidjs-email/code-block': resolve(packagesDir, 'code-block/src/index.ts'),
      '@solidjs-email/code-inline': resolve(packagesDir, 'code-inline/src/index.ts'),
      '@solidjs-email/column': resolve(packagesDir, 'column/src/index.ts'),
      '@solidjs-email/container': resolve(packagesDir, 'container/src/index.ts'),
      '@solidjs-email/font': resolve(packagesDir, 'font/src/index.ts'),
      '@solidjs-email/head': resolve(packagesDir, 'head/src/index.ts'),
      '@solidjs-email/heading': resolve(packagesDir, 'heading/src/index.ts'),
      '@solidjs-email/hr': resolve(packagesDir, 'hr/src/index.ts'),
      '@solidjs-email/html': resolve(packagesDir, 'html/src/index.ts'),
      '@solidjs-email/img': resolve(packagesDir, 'img/src/index.ts'),
      '@solidjs-email/link': resolve(packagesDir, 'link/src/index.ts'),
      '@solidjs-email/markdown': resolve(packagesDir, 'markdown/src/index.ts'),
      '@solidjs-email/preview': resolve(packagesDir, 'preview/src/index.ts'),
      '@solidjs-email/render': resolve(packagesDir, 'render/src/index.ts'),
      '@solidjs-email/row': resolve(packagesDir, 'row/src/index.ts'),
      '@solidjs-email/section': resolve(packagesDir, 'section/src/index.ts'),
      '@solidjs-email/tailwind': resolve(packagesDir, 'tailwind/src/index.ts'),
      '@solidjs-email/text': resolve(packagesDir, 'text/src/index.ts'),
    },
  },
});

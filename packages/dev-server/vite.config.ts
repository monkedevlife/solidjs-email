import solid from '@solidjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 6008,
  },
  plugins: [
    tanstackRouter({ target: 'solid' }),
    solid({
      start: {
        setup: './src/setup.tsx',
      },
      ssr: true,
      serverFunctions: true,
    }),
    tailwindcss(),
  ],
});

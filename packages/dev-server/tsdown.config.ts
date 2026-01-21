import solid from 'rolldown-plugin-solid';
import { defineConfig } from 'tsdown';

export default defineConfig({
  format: ['esm'],
  dts: true,
  plugins: [solid()],
});

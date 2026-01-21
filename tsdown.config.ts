import solid from 'rolldown-plugin-solid';
import { defineConfig } from 'tsdown';

export default defineConfig({
  format: ['esm', 'cjs'],
  dts: true,
  plugins: [solid()],
});

export {
  Tailwind,
  type TailwindConfig,
  type TailwindProps,
  type TailwindProcessorOptions,
  pixelBasedPreset,
  createTailwindProcessor,
  processTailwindInHtml,
  collectClasses,
  type TailwindProcessor,
} from './tailwind';
export { inlineStyles } from './inline-styles';
export { sanitizeStyleSheet } from './sanitize-stylesheet';
export {
  setupTailwind,
  type TailwindSetup,
  type SetupTailwindOptions,
} from './utils/tailwindcss/setup-tailwind';

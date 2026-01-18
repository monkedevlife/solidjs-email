import { parse, type StyleSheet } from 'css-tree';
import { compile } from 'tailwindcss';
import type { TailwindConfig } from '../../tailwind';
import indexCss from './tailwind-stylesheets/index';
import preflightCss from './tailwind-stylesheets/preflight';
import themeCss from './tailwind-stylesheets/theme';
import utilitiesCss from './tailwind-stylesheets/utilities';

export type TailwindSetup = Awaited<ReturnType<typeof setupTailwind>>;

export interface SetupTailwindOptions {
  config?: TailwindConfig;
  css?: string;
}

export async function setupTailwind(
  options: TailwindConfig | SetupTailwindOptions = {},
) {
  const normalizedOptions = normalizeOptions(options);
  const { config = {}, css: customCss } = normalizedOptions;

  const baseCss = customCss
    ? customCss
    : `
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
@config;
`;

  const compiler = await compile(baseCss, {
    async loadModule(id, base, resourceHint) {
      if (resourceHint === 'config') {
        return {
          path: id,
          base: base,
          module: config,
        };
      }

      if (resourceHint === 'plugin') {
        throw new Error(
          `Plugin imports are not supported: ${id}. Use the config object to pass plugins.`,
        );
      }

      throw new Error(
        `Module loading not supported for ${resourceHint}: ${id}`,
      );
    },
    polyfills: 0,
    async loadStylesheet(id, base) {
      if (id === 'tailwindcss') {
        return {
          base,
          path: 'tailwindcss/index.css',
          content: indexCss,
        };
      }

      if (id === 'tailwindcss/preflight.css') {
        return {
          base,
          path: id,
          content: preflightCss,
        };
      }

      if (id === 'tailwindcss/theme.css') {
        return {
          base,
          path: id,
          content: themeCss,
        };
      }

      if (id === 'tailwindcss/utilities.css') {
        return {
          base,
          path: id,
          content: utilitiesCss,
        };
      }

      throw new Error(
        `Stylesheet not supported: ${id}. You can only import from tailwindcss.`,
      );
    },
  });

  let css: string = baseCss;

  return {
    addUtilities: function addUtilities(candidates: string[]): void {
      css = compiler.build(candidates);
    },
    getStyleSheet: function getCss() {
      return parse(css) as StyleSheet;
    },
  };
}

function normalizeOptions(
  options: TailwindConfig | SetupTailwindOptions,
): SetupTailwindOptions {
  if ('css' in options || ('config' in options && !('theme' in options))) {
    return options as SetupTailwindOptions;
  }
  return { config: options as TailwindConfig };
}

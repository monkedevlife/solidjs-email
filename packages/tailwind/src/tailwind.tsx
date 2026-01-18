import {
  type CssNode,
  generate,
  List,
  type Rule,
  type StyleSheet,
} from 'css-tree';
import type { Config } from 'tailwindcss';
import type { Component, JSX } from 'solid-js';
import { sanitizeStyleSheet } from './sanitize-stylesheet';
import { extractRulesPerClass } from './utils/css/extract-rules-per-class';
import {
  getCustomProperties,
  type CustomProperties,
} from './utils/css/get-custom-properties';
import { sanitizeNonInlinableRules } from './utils/css/sanitize-non-inlinable-rules';
import {
  setupTailwind,
  type SetupTailwindOptions,
} from './utils/tailwindcss/setup-tailwind';
import { makeInlineStylesFor } from './utils/css/make-inline-styles-for';
import { sanitizeClassName } from './utils/compatibility/sanitize-class-name';

export type TailwindConfig = Omit<Config, 'content'>;

export interface TailwindProps {
  children: JSX.Element;
  config?: TailwindConfig;
  css?: string;
}

export const pixelBasedPreset: TailwindConfig = {
  theme: {
    extend: {
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '36px' }],
        '5xl': ['48px', { lineHeight: '1' }],
        '6xl': ['60px', { lineHeight: '1' }],
        '7xl': ['72px', { lineHeight: '1' }],
        '8xl': ['96px', { lineHeight: '1' }],
        '9xl': ['144px', { lineHeight: '1' }],
      },
      spacing: {
        px: '1px',
        0: '0',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px',
      },
    },
  },
};

export interface TailwindProcessorOptions {
  config?: TailwindConfig;
  css?: string;
}

export interface TailwindProcessor {
  processClass: (
    className: string | undefined,
    existingStyle?: Record<string, string>,
  ) => {
    style: Record<string, string>;
    class: string | undefined;
  };
  getNonInlineStyles: () => string;
  hasNonInlineStyles: () => boolean;
}

export async function createTailwindProcessor(
  classes: string[],
  options: TailwindConfig | TailwindProcessorOptions = {},
): Promise<TailwindProcessor> {
  const normalizedOptions = normalizeProcessorOptions(options);
  const tailwindSetup = await setupTailwind(normalizedOptions);
  tailwindSetup.addUtilities(classes);

  const styleSheet = tailwindSetup.getStyleSheet();
  sanitizeStyleSheet(styleSheet);

  const { inlinable: inlinableRules, nonInlinable: nonInlinableRules } =
    extractRulesPerClass(styleSheet, classes);

  const customProperties = getCustomProperties(styleSheet);

  const nonInlineStyles: StyleSheet = {
    type: 'StyleSheet',
    children: new List<CssNode>().fromArray(
      Array.from(nonInlinableRules.values()),
    ),
  };
  sanitizeNonInlinableRules(nonInlineStyles);

  const nonInlineStylesString = generate(nonInlineStyles);

  return {
    processClass: (
      className: string | undefined,
      existingStyle: Record<string, string> = {},
    ) => {
      if (!className) {
        return { style: existingStyle, class: undefined };
      }

      const classList = className.trim().split(/\s+/);
      const residualClasses: string[] = [];
      const rules: Rule[] = [];

      for (const cls of classList) {
        const rule = inlinableRules.get(cls);
        if (rule) {
          rules.push(rule);
        } else {
          residualClasses.push(cls);
        }
      }

      const inlinedStyle = makeInlineStylesFor(rules, customProperties);

      const combinedStyle: Record<string, string> = {
        ...inlinedStyle,
        ...existingStyle,
      };

      const newClassName =
        residualClasses.length > 0
          ? residualClasses
              .map((cls) => {
                if (nonInlinableRules.has(cls)) {
                  return sanitizeClassName(cls);
                }
                return cls;
              })
              .join(' ')
          : undefined;

      return { style: combinedStyle, class: newClassName };
    },
    getNonInlineStyles: () => nonInlineStylesString,
    hasNonInlineStyles: () => nonInlinableRules.size > 0,
  };
}

export function collectClasses(html: string): string[] {
  const classRegex = /class="([^"]*)"/g;
  const classes = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = classRegex.exec(html)) !== null) {
    const classString = match[1];
    for (const cls of classString.split(/\s+/)) {
      if (cls) {
        classes.add(cls);
      }
    }
  }

  return Array.from(classes);
}

export async function processTailwindInHtml(
  html: string,
  options: TailwindConfig | TailwindProcessorOptions = {},
): Promise<string> {
  const classes = collectClasses(html);
  if (classes.length === 0) {
    return html;
  }

  const processor = await createTailwindProcessor(classes, options);

  let processedHtml = html.replace(
    /class="([^"]*)"/g,
    (match, classString: string) => {
      const result = processor.processClass(classString);
      const styleStr = Object.entries(result.style)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${cssKey}:${value}`;
        })
        .join(';');

      const parts: string[] = [];
      if (styleStr) {
        parts.push(`style="${styleStr}"`);
      }
      if (result.class) {
        parts.push(`class="${result.class}"`);
      }

      return parts.join(' ') || match;
    },
  );

  if (processor.hasNonInlineStyles()) {
    const styleTag = `<style>${processor.getNonInlineStyles()}</style>`;
    processedHtml = processedHtml.replace(
      /<head([^>]*)>/i,
      `<head$1>${styleTag}`,
    );
  }

  return processedHtml;
}

export const Tailwind: Component<TailwindProps> = (props) => {
  return props.children;
};

function normalizeProcessorOptions(
  options: TailwindConfig | TailwindProcessorOptions,
): TailwindProcessorOptions {
  if ('css' in options || ('config' in options && !('theme' in options))) {
    return options as TailwindProcessorOptions;
  }
  return { config: options as TailwindConfig };
}

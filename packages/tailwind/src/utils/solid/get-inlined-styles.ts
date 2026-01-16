import type { JSX } from 'solid-js';
import type { Rule } from 'css-tree';
import { sanitizeClassName } from '../compatibility/sanitize-class-name';
import type { CustomProperties } from '../css/get-custom-properties';
import { makeInlineStylesFor } from '../css/make-inline-styles-for';

export interface ElementProps {
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}

export function getInlinedStylesForElement(
  className: string | undefined,
  existingStyle: JSX.CSSProperties | string | undefined,
  inlinableRules: Map<string, Rule>,
  nonInlinableRules: Map<string, Rule>,
  customProperties: CustomProperties,
): { style: JSX.CSSProperties; className: string | undefined } {
  if (!className) {
    return {
      style: typeof existingStyle === 'object' ? existingStyle : {},
      className: undefined,
    };
  }

  const classes = className.trim().split(/\s+/);
  const residualClasses: string[] = [];
  const rules: Rule[] = [];

  for (const cls of classes) {
    const rule = inlinableRules.get(cls);
    if (rule) {
      rules.push(rule);
    } else {
      residualClasses.push(cls);
    }
  }

  const inlinedStyles = makeInlineStylesFor(rules, customProperties);
  const existingStyleObj = typeof existingStyle === 'object' ? existingStyle : {};

  const combinedStyle: JSX.CSSProperties = {
    ...inlinedStyles,
    ...existingStyleObj,
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

  return {
    style: combinedStyle,
    className: newClassName,
  };
}

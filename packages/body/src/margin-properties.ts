import type { JSX } from 'solid-js';

export const marginProperties = [
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-right',
  'margin-left',
  'margin-inline',
  'margin-block',
  'margin-block-start',
  'margin-block-end',
  'margin-inline-start',
  'margin-inline-end',
] as const;

export type MarginProperty = (typeof marginProperties)[number];

export function hasMarginProperty(
  style: JSX.CSSProperties | undefined,
  property: MarginProperty,
): boolean {
  if (!style) return false;
  return property in style && style[property as keyof JSX.CSSProperties] !== undefined;
}

import type { JSX } from 'solid-js';

type MarginCSSProperty =
  | 'margin'
  | 'margin-left'
  | 'margin-right'
  | 'margin-top'
  | 'margin-bottom';

type MarginStyles = Partial<Record<MarginCSSProperty, string | number>>;

export interface Margin {
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
}

function withSpace(
  value: number | string | undefined,
  properties: MarginCSSProperty[],
): MarginStyles {
  const styles: MarginStyles = {};

  if (value === undefined) {
    return styles;
  }

  if (Number.isNaN(Number.parseFloat(String(value)))) {
    return styles;
  }

  for (const property of properties) {
    styles[property] = `${value}px`;
  }

  return styles;
}

export function withMargin(props: Margin): JSX.CSSProperties {
  const candidates = [
    withSpace(props.m, ['margin']),
    withSpace(props.mx, ['margin-left', 'margin-right']),
    withSpace(props.my, ['margin-top', 'margin-bottom']),
    withSpace(props.mt, ['margin-top']),
    withSpace(props.mr, ['margin-right']),
    withSpace(props.mb, ['margin-bottom']),
    withSpace(props.ml, ['margin-left']),
  ];

  const mergedStyles: MarginStyles = {};

  for (const style of candidates) {
    if (Object.keys(style).length > 0) {
      Object.assign(mergedStyles, style);
    }
  }

  return mergedStyles;
}

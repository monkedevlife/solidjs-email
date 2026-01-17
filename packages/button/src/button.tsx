import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';
import { parsePadding } from './utils/parse-padding';
import { pxToPt } from './utils/px-to-pt';

export type ButtonProps = Readonly<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>;

const maxFontWidth = 5;

function computeFontWidthAndSpaceCount(expectedWidth: number) {
  if (expectedWidth === 0) return [0, 0] as const;

  let smallestSpaceCount = 0;

  const computeRequiredFontWidth = () => {
    if (smallestSpaceCount > 0) {
      return expectedWidth / smallestSpaceCount / 2;
    }
    return Number.POSITIVE_INFINITY;
  };

  while (computeRequiredFontWidth() > maxFontWidth) {
    smallestSpaceCount++;
  }

  return [computeRequiredFontWidth(), smallestSpaceCount] as const;
}

export const Button: Component<ButtonProps> = (props) => {
  const merged = mergeProps({ target: '_blank' as const }, props);
  const [local, others] = splitProps(merged, ['children', 'style', 'target']);

  const styleObj = () => {
    const s = local.style;
    if (typeof s === 'string') return {};
    return s ?? {};
  };

  const padding = () => parsePadding(styleObj());

  const y = () => (padding().paddingTop ?? 0) + (padding().paddingBottom ?? 0);
  const textRaise = () => pxToPt(y());

  const plResult = () => computeFontWidthAndSpaceCount(padding().paddingLeft ?? 0);
  const prResult = () => computeFontWidthAndSpaceCount(padding().paddingRight ?? 0);

  const leftMsoHtml = () => {
    const [fontWidth, spaceCount] = plResult();
    return `<!--[if mso]><i style="mso-font-width:${
      fontWidth * 100
    }%;mso-text-raise:${textRaise()}" hidden>${'&#8202;'.repeat(
      spaceCount,
    )}</i><![endif]-->`;
  };

  const rightMsoHtml = () => {
    const [fontWidth, spaceCount] = prResult();
    return `<!--[if mso]><i style="mso-font-width:${
      fontWidth * 100
    }%" hidden>${'&#8202;'.repeat(spaceCount)}&#8203;</i><![endif]-->`;
  };

  return (
    <a
      {...others}
      style={{
        'line-height': '100%',
        'text-decoration': 'none',
        display: 'inline-block',
        'max-width': '100%',
        'mso-padding-alt': '0px',
        ...styleObj(),
        'padding-top': padding().paddingTop ? `${padding().paddingTop}px` : undefined,
        'padding-right': padding().paddingRight ? `${padding().paddingRight}px` : undefined,
        'padding-bottom': padding().paddingBottom ? `${padding().paddingBottom}px` : undefined,
        'padding-left': padding().paddingLeft ? `${padding().paddingLeft}px` : undefined,
      }}
      target={local.target}
    >
      <span innerHTML={leftMsoHtml()} />
      <span
        style={{
          'max-width': '100%',
          display: 'inline-block',
          'line-height': '120%',
          'mso-padding-alt': '0px',
          'mso-text-raise': pxToPt(padding().paddingBottom),
        }}
      >
        {local.children}
      </span>
      <span innerHTML={rightMsoHtml()} />
    </a>
  );
};

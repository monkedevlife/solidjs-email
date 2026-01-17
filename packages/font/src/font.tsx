import type { Component, JSX } from 'solid-js';

type FallbackFont =
  | 'Arial'
  | 'Helvetica'
  | 'Verdana'
  | 'Georgia'
  | 'Times New Roman'
  | 'serif'
  | 'sans-serif'
  | 'monospace'
  | 'cursive'
  | 'fantasy';

type FontFormat =
  | 'woff'
  | 'woff2'
  | 'truetype'
  | 'opentype'
  | 'embedded-opentype'
  | 'svg';

type FontWeight = JSX.CSSProperties['font-weight'];
type FontStyle = JSX.CSSProperties['font-style'];

export type FontProps = Readonly<{
  fontFamily: string;
  fallbackFontFamily: FallbackFont | FallbackFont[];
  webFont?: {
    url: string;
    format: FontFormat;
  };
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
}>;

export const Font: Component<FontProps> = (props) => {
  const src = () =>
    props.webFont
      ? `src: url(${props.webFont.url}) format('${props.webFont.format}');`
      : '';

  const msoFontAlt = () =>
    Array.isArray(props.fallbackFontFamily)
      ? props.fallbackFontFamily[0]
      : props.fallbackFontFamily;

  const fallbackFonts = () =>
    Array.isArray(props.fallbackFontFamily)
      ? props.fallbackFontFamily.join(', ')
      : props.fallbackFontFamily;

  const style = () => `
    @font-face {
      font-family: '${props.fontFamily}';
      font-style: ${props.fontStyle ?? 'normal'};
      font-weight: ${props.fontWeight ?? 400};
      mso-font-alt: '${msoFontAlt()}';
      ${src()}
    }

    * {
      font-family: '${props.fontFamily}', ${fallbackFonts()};
    }
  `;

  return <style innerHTML={style()} />;
};

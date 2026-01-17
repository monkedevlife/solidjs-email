import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { computeMargins } from './utils/compute-margins';

export type TextProps = Readonly<JSX.HTMLAttributes<HTMLParagraphElement>>;

export const Text: Component<TextProps> = (props) => {
  const [local, others] = splitProps(props, ['style', 'children']);

  const styleObj = () => {
    const s = local.style;
    if (typeof s === 'string') return {};
    return s ?? {};
  };

  const defaultMargins = () => {
    const s = styleObj();
    const result: Record<string, string> = {};
    if (s['margin-top'] === undefined && s.marginTop === undefined) {
      result['margin-top'] = '16px';
    }
    if (s['margin-bottom'] === undefined && s.marginBottom === undefined) {
      result['margin-bottom'] = '16px';
    }
    return result;
  };

  const margins = () => computeMargins({
    ...defaultMargins(),
    ...styleObj(),
  });

  return (
    <p
      {...others}
      style={{
        'font-size': '14px',
        'line-height': '24px',
        ...styleObj(),
        ...margins(),
      }}
    >
      {local.children}
    </p>
  );
};

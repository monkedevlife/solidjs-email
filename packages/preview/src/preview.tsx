import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type PreviewProps = Readonly<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: string | string[];
  }
>;

const PREVIEW_MAX_LENGTH = 150;
const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';

export const Preview: Component<PreviewProps> = (props) => {
  const [local, others] = splitProps(props, ['children']);

  const text = () => {
    const c = local.children ?? '';
    return (Array.isArray(c) ? c.join('') : c).substring(0, PREVIEW_MAX_LENGTH);
  };

  const whitespace = () => {
    const t = text();
    if (t.length >= PREVIEW_MAX_LENGTH) {
      return null;
    }
    return whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - t.length);
  };

  return (
    <div
      style={{
        display: 'none',
        overflow: 'hidden',
        'line-height': '1px',
        opacity: 0,
        'max-height': 0,
        'max-width': 0,
      }}
      data-skip-in-text={true}
      {...others}
    >
      {text()}
      {whitespace() && <div>{whitespace()}</div>}
    </div>
  );
};

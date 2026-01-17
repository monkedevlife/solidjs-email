import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';

export type LinkProps = Readonly<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>;

export const Link: Component<LinkProps> = (props) => {
  const merged = mergeProps({ target: '_blank' as const }, props);
  const [local, others] = splitProps(merged, ['children', 'style', 'target']);

  return (
    <a
      {...others}
      style={{
        color: '#067df7',
        'text-decoration-line': 'none',
        ...local.style,
      }}
      target={local.target}
    >
      {local.children}
    </a>
  );
};

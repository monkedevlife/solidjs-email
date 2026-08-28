import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type LinkProps = Readonly<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>;

export const Link: Component<LinkProps> = (props) => {
  const others = omit(props, 'children', 'style', 'target');

  return (
    <a
      {...others}
      style={{
        color: '#067df7',
        'text-decoration-line': 'none',
        ...props.style,
      }}
      target={props.target ?? '_blank'}
    >
      {props.children}
    </a>
  );
};

import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type HeadProps = Readonly<JSX.HTMLAttributes<HTMLHeadElement>>;

export const Head: Component<HeadProps> = (props) => {
  const others = omit(props, 'children');

  return (
    <head {...others}>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="x-apple-disable-message-reformatting" />
      {props.children}
    </head>
  );
};

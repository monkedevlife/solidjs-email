import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type HeadProps = Readonly<JSX.HTMLAttributes<HTMLHeadElement>>;

export const Head: Component<HeadProps> = (props) => {
  const [local, others] = splitProps(props, ['children']);

  return (
    <head {...others}>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="x-apple-disable-message-reformatting" />
      {local.children}
    </head>
  );
};

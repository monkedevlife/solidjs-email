import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type HrProps = Readonly<JSX.HTMLAttributes<HTMLHRElement>>;

export const Hr: Component<HrProps> = (props) => {
  const [local, others] = splitProps(props, ['style']);

  return (
    <hr
      {...others}
      style={{
        width: '100%',
        border: 'none',
        'border-top': '1px solid #eaeaea',
        ...local.style,
      }}
    />
  );
};

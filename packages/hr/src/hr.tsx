import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type HrProps = Readonly<JSX.HTMLAttributes<HTMLHRElement>>;

export const Hr: Component<HrProps> = (props) => {
  const others = omit(props, 'style');

  return (
    <hr
      {...others}
      style={{
        width: '100%',
        border: 'none',
        'border-top': '1px solid #eaeaea',
        ...props.style,
      }}
    />
  );
};

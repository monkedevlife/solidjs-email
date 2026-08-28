import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type RowProps = Readonly<JSX.HTMLAttributes<HTMLTableElement>>;

export const Row: Component<RowProps> = (props) => {
  const others = omit(props, 'children', 'style');

  return (
    <table
      align="center"
      width="100%"
      border={0}
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      {...others}
      style={props.style}
    >
      <tbody style={{ width: '100%' }}>
        <tr style={{ width: '100%' }}>{props.children}</tr>
      </tbody>
    </table>
  );
};

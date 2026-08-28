import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type ColumnProps = Readonly<JSX.TdHTMLAttributes<HTMLTableCellElement>>;

export const Column: Component<ColumnProps> = (props) => {
  const others = omit(props, 'children', 'style');

  return (
    <td {...others} data-id="__solidjs-email-column" style={props.style}>
      {props.children}
    </td>
  );
};

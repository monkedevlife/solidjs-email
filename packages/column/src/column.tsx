import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type ColumnProps = Readonly<JSX.TdHTMLAttributes<HTMLTableCellElement>>;

export const Column: Component<ColumnProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'style']);

  return (
    <td {...others} data-id="__solidjs-email-column" style={local.style}>
      {local.children}
    </td>
  );
};

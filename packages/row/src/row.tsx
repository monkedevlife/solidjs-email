import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type RowProps = Readonly<JSX.HTMLAttributes<HTMLTableElement>>;

export const Row: Component<RowProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'style']);

  return (
    <table
      align="center"
      width="100%"
      border={0}
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      {...others}
      style={local.style}
    >
      <tbody style={{ width: '100%' }}>
        <tr style={{ width: '100%' }}>{local.children}</tr>
      </tbody>
    </table>
  );
};

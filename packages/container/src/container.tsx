import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type ContainerProps = Readonly<JSX.HTMLAttributes<HTMLTableElement>>;

export const Container: Component<ContainerProps> = (props) => {
  const others = omit(props, 'children', 'style');

  return (
    <table
      align="center"
      width="100%"
      {...others}
      border={0}
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{ 'max-width': '37.5em', ...props.style }}
    >
      <tbody>
        <tr style={{ width: '100%' }}>
          <td>{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
};

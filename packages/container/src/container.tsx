import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type ContainerProps = Readonly<JSX.HTMLAttributes<HTMLTableElement>>;

export const Container: Component<ContainerProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'style']);

  return (
    <table
      align="center"
      width="100%"
      {...others}
      border={0}
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{ 'max-width': '37.5em', ...local.style }}
    >
      <tbody>
        <tr style={{ width: '100%' }}>
          <td>{local.children}</td>
        </tr>
      </tbody>
    </table>
  );
};

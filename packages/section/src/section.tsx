import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type SectionProps = Readonly<JSX.HTMLAttributes<HTMLTableElement>>;

export const Section: Component<SectionProps> = (props) => {
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
      <tbody>
        <tr>
          <td>{local.children}</td>
        </tr>
      </tbody>
    </table>
  );
};

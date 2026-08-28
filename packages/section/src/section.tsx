import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type SectionProps = Readonly<JSX.HTMLAttributes<HTMLTableElement>>;

export const Section: Component<SectionProps> = (props) => {
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
      <tbody>
        <tr>
          <td>{props.children}</td>
        </tr>
      </tbody>
    </table>
  );
};

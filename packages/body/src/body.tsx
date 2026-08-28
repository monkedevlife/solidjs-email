import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';
import { hasMarginProperty, marginProperties } from './margin-properties';

export type BodyProps = Readonly<JSX.HTMLAttributes<HTMLBodyElement>>;

export const Body: Component<BodyProps> = (props) => {
  const others = omit(props, 'children', 'style');

  const bodyStyle = (): JSX.CSSProperties => {
    const style: JSX.CSSProperties = {
      background: props.style?.background,
      'background-color': props.style?.['background-color'],
    };

    if (props.style) {
      for (const property of marginProperties) {
        if (hasMarginProperty(props.style, property)) {
          style[property] = 0;
        }
      }
    }

    return style;
  };

  return (
    <body {...others} style={bodyStyle()}>
      <table
        border={0}
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        align="center"
      >
        <tbody>
          <tr>
            <td style={props.style}>{props.children}</td>
          </tr>
        </tbody>
      </table>
    </body>
  );
};

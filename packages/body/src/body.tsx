import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { hasMarginProperty, marginProperties } from './margin-properties';

export type BodyProps = Readonly<JSX.HTMLAttributes<HTMLBodyElement>>;

export const Body: Component<BodyProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'style']);

  const bodyStyle = (): JSX.CSSProperties => {
    const style: JSX.CSSProperties = {
      background: local.style?.background,
      'background-color': local.style?.['background-color'],
    };

    if (local.style) {
      for (const property of marginProperties) {
        if (hasMarginProperty(local.style, property)) {
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
            <td style={local.style}>{local.children}</td>
          </tr>
        </tbody>
      </table>
    </body>
  );
};

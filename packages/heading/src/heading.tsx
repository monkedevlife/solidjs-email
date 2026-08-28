import type { JSX } from '@solidjs/web';
import { Dynamic } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';
import { type Margin, withMargin } from './utils/spaces';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = Readonly<
  JSX.HTMLAttributes<HTMLHeadingElement> &
    Margin & {
      as?: HeadingTag;
    }
>;

export const Heading: Component<HeadingProps> = (props) => {
  const others = omit(
    props,
    'as',
    'children',
    'style',
    'm',
    'mx',
    'my',
    'mt',
    'mr',
    'mb',
    'ml',
  );

  const margins = () => withMargin(props);

  return (
    <Dynamic
      component={props.as ?? 'h1'}
      {...others}
      style={{ ...margins(), ...props.style }}
    >
      {props.children}
    </Dynamic>
  );
};

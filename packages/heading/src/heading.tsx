import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { type Margin, withMargin } from './utils/spaces';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = Readonly<
  JSX.HTMLAttributes<HTMLHeadingElement> &
    Margin & {
      as?: HeadingTag;
    }
>;

export const Heading: Component<HeadingProps> = (props) => {
  const [local, marginProps, others] = splitProps(
    props,
    ['as', 'children', 'style'],
    ['m', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'],
  );

  const margins = () => withMargin(marginProps);

  return (
    <Dynamic
      component={local.as ?? 'h1'}
      {...others}
      style={{ ...margins(), ...local.style }}
    >
      {local.children}
    </Dynamic>
  );
};

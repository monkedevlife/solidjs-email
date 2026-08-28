import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

type RootProps = JSX.HTMLAttributes<HTMLElement> &
  JSX.HTMLAttributes<HTMLSpanElement>;

export type CodeInlineProps = Readonly<RootProps>;

export const CodeInline: Component<CodeInlineProps> = (props) => {
  const others = omit(props, 'children', 'class');

  return (
    <>
      {/* 
        This style tag is targeted at fixing an issue for the Orange.fr email client
        See:
        - https://www.caniemail.com/features/html-code/
        - https://www.howtotarget.email/#2019-03-26-freenet-2

        On that email client, the head and html elements are removed, making the meta tag a sibling of them
        allowing us to use a selector on them. Also <style> tags are supported on it.
      */}
      <style>{`
        meta ~ .cino {
          display: none !important;
          opacity: 0 !important;
        }

        meta ~ .cio {
          display: block !important;
        }
      `}</style>

      {/* Does not render on Orange.fr */}
      <code {...others} class={`${props.class ? props.class : ''} cino`.trim()}>
        {props.children}
      </code>

      {/* Renders only on Orange.fr */}
      <span
        {...others}
        class={`${props.class ? props.class : ''} cio`.trim()}
        style={{ display: 'none', ...(others.style as JSX.CSSProperties) }}
      >
        {props.children}
      </span>
    </>
  );
};

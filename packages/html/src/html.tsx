import type { JSX } from '@solidjs/web';
import type { Component } from 'solid-js';
import { omit } from 'solid-js';

export type HtmlProps = Readonly<JSX.HTMLAttributes<HTMLHtmlElement>>;

export const Html: Component<HtmlProps> = (props) => {
  const others = omit(props, 'children', 'lang', 'dir');

  return (
    <html {...others} lang={props.lang ?? 'en'} dir={props.dir ?? 'ltr'}>
      {props.children}
    </html>
  );
};

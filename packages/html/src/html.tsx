import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';

export type HtmlProps = Readonly<JSX.HTMLAttributes<HTMLHtmlElement>>;

export const Html: Component<HtmlProps> = (props) => {
  const merged = mergeProps({ lang: 'en', dir: 'ltr' as const }, props);
  const [local, others] = splitProps(merged, ['children']);

  return <html {...others}>{local.children}</html>;
};

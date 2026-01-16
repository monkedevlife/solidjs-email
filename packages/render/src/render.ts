import type { JSX } from 'solid-js';
import { renderToStringAsync } from 'solid-js/web';
import { pretty } from './utils/pretty';
import { toPlainText } from './utils/to-plain-text';

export interface RenderOptions {
  pretty?: boolean;
  plainText?: boolean;
  htmlToTextOptions?: Parameters<typeof toPlainText>[1];
}

export async function render(
  component: () => JSX.Element,
  options?: RenderOptions,
): Promise<string> {
  const html = await renderToStringAsync(component);

  if (options?.plainText) {
    return toPlainText(html, options.htmlToTextOptions);
  }

  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

  const document = `${doctype}${html.replace(/<!DOCTYPE.*?>/, '')}`;

  if (options?.pretty) {
    return pretty(document);
  }

  return document;
}

import type { JSX } from 'solid-js';
import { renderToStringAsync } from 'solid-js/web';
import { pretty } from './utils/pretty';
import { toPlainText } from './utils/to-plain-text';

export interface TailwindOptions {
  config?: Record<string, unknown>;
  css?: string;
}

export interface RenderOptions {
  pretty?: boolean;
  plainText?: boolean;
  htmlToTextOptions?: Parameters<typeof toPlainText>[1];
  tailwind?: TailwindOptions;
}

async function processTailwind(
  html: string,
  options?: TailwindOptions,
): Promise<string> {
  try {
    const { processTailwindInHtml } = await import('@monkedevlife/solidjs-email-tailwind');
    return processTailwindInHtml(html, options as Parameters<typeof processTailwindInHtml>[1]);
  } catch {
    return html;
  }
}

export async function render(
  component: () => JSX.Element,
  options?: RenderOptions,
): Promise<string> {
  let html = await renderToStringAsync(component);

  html = await processTailwind(html, options?.tailwind);

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

import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { marked, Renderer } from 'marked';
import { type StylesType, defaultStyles } from './styles';
import { parseCssInJsToInlineCss } from './utils/parse-css-in-js-to-inline-css';

export type MarkdownProps = Readonly<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: string;
    markdownCustomStyles?: StylesType;
    markdownContainerStyles?: JSX.CSSProperties;
  }
>;

export const Markdown: Component<MarkdownProps> = (props) => {
  const [local, others] = splitProps(props, [
    'children',
    'markdownCustomStyles',
    'markdownContainerStyles',
  ]);

  const finalStyles = () => ({ ...defaultStyles, ...local.markdownCustomStyles });

  const renderedHtml = () => {
    const styles = finalStyles();
    const renderer = new Renderer();

    renderer.blockquote = ({ tokens }) => {
      const text = renderer.parser.parse(tokens);
      const style = parseCssInJsToInlineCss(styles.blockQuote as Record<string, unknown>);
      return `<blockquote${style ? ` style="${style}"` : ''}>\n${text}</blockquote>\n`;
    };

    renderer.br = () => {
      const style = parseCssInJsToInlineCss(styles.br as Record<string, unknown>);
      return `<br${style ? ` style="${style}"` : ''} />`;
    };

    renderer.code = ({ text }) => {
      const code = `${text.replace(/\n$/, '')}\n`;
      const style = parseCssInJsToInlineCss(styles.codeBlock as Record<string, unknown>);
      return `<pre${style ? ` style="${style}"` : ''}><code>${code}</code></pre>\n`;
    };

    renderer.codespan = ({ text }) => {
      const style = parseCssInJsToInlineCss(styles.codeInline as Record<string, unknown>);
      return `<code${style ? ` style="${style}"` : ''}>${text}</code>`;
    };

    renderer.del = ({ tokens }) => {
      const text = renderer.parser.parseInline(tokens);
      const style = parseCssInJsToInlineCss(styles.strikethrough as Record<string, unknown>);
      return `<del${style ? ` style="${style}"` : ''}>${text}</del>`;
    };

    renderer.em = ({ tokens }) => {
      const text = renderer.parser.parseInline(tokens);
      const style = parseCssInJsToInlineCss(styles.italic as Record<string, unknown>);
      return `<em${style ? ` style="${style}"` : ''}>${text}</em>`;
    };

    renderer.heading = ({ tokens, depth }) => {
      const text = renderer.parser.parseInline(tokens);
      const styleKey = `h${depth}` as keyof StylesType;
      const style = parseCssInJsToInlineCss(styles[styleKey] as Record<string, unknown>);
      return `<h${depth}${style ? ` style="${style}"` : ''}>${text}</h${depth}>`;
    };

    renderer.hr = () => {
      const style = parseCssInJsToInlineCss(styles.hr as Record<string, unknown>);
      return `<hr${style ? ` style="${style}"` : ''} />\n`;
    };

    renderer.image = ({ href, text, title }) => {
      const style = parseCssInJsToInlineCss(styles.image as Record<string, unknown>);
      return `<img src="${href.replaceAll('"', '&quot;')}" alt="${text.replaceAll('"', '&quot;')}"${
        title ? ` title="${title}"` : ''
      }${style ? ` style="${style}"` : ''}>`;
    };

    renderer.link = ({ href, title, tokens }) => {
      const text = renderer.parser.parseInline(tokens);
      const style = parseCssInJsToInlineCss(styles.link as Record<string, unknown>);
      return `<a href="${href}" target="_blank"${
        title ? ` title="${title}"` : ''
      }${style ? ` style="${style}"` : ''}>${text}</a>`;
    };

    renderer.listitem = ({ tokens }) => {
      const hasNestedList = tokens.some((token) => token.type === 'list');
      const text = hasNestedList
        ? renderer.parser.parse(tokens)
        : renderer.parser.parseInline(tokens);
      const style = parseCssInJsToInlineCss(styles.li as Record<string, unknown>);
      return `<li${style ? ` style="${style}"` : ''}>${text}</li>\n`;
    };

    renderer.list = ({ items, ordered, start }) => {
      const type = ordered ? 'ol' : 'ul';
      const startAt = ordered && start !== 1 ? ` start="${start}"` : '';
      const style = parseCssInJsToInlineCss(
        styles[ordered ? 'ol' : 'ul'] as Record<string, unknown>,
      );
      return (
        '<' +
        type +
        startAt +
        `${style ? ` style="${style}"` : ''}>\n` +
        items.map((item) => renderer.listitem(item)).join('') +
        '</' +
        type +
        '>\n'
      );
    };

    renderer.paragraph = ({ tokens }) => {
      const text = renderer.parser.parseInline(tokens);
      const style = parseCssInJsToInlineCss(styles.p as Record<string, unknown>);
      return `<p${style ? ` style="${style}"` : ''}>${text}</p>\n`;
    };

    renderer.strong = ({ tokens }) => {
      const text = renderer.parser.parseInline(tokens);
      const style = parseCssInJsToInlineCss(styles.bold as Record<string, unknown>);
      return `<strong${style ? ` style="${style}"` : ''}>${text}</strong>`;
    };

    renderer.table = ({ header, rows }) => {
      const styleTable = parseCssInJsToInlineCss(styles.table as Record<string, unknown>);
      const styleThead = parseCssInJsToInlineCss(styles.thead as Record<string, unknown>);
      const styleTbody = parseCssInJsToInlineCss(styles.tbody as Record<string, unknown>);

      const theadRow = renderer.tablerow({
        text: header.map((cell) => renderer.tablecell(cell)).join(''),
      });

      const tbodyRows = rows
        .map((row) =>
          renderer.tablerow({
            text: row.map((cell) => renderer.tablecell(cell)).join(''),
          }),
        )
        .join('');

      const thead = `<thead${styleThead ? ` style="${styleThead}"` : ''}>\n${theadRow}</thead>`;
      const tbody = `<tbody${styleTbody ? ` style="${styleTbody}"` : ''}>${tbodyRows}</tbody>`;

      return `<table${styleTable ? ` style="${styleTable}"` : ''}>\n${thead}\n${tbody}</table>\n`;
    };

    renderer.tablecell = ({ tokens, align, header }) => {
      const text = renderer.parser.parseInline(tokens);
      const type = header ? 'th' : 'td';
      const style = parseCssInJsToInlineCss(styles.td as Record<string, unknown>);
      const tag = align
        ? `<${type} align="${align}"${style ? ` style="${style}"` : ''}>`
        : `<${type}${style ? ` style="${style}"` : ''}>`;
      return `${tag}${text}</${type}>\n`;
    };

    renderer.tablerow = ({ text }) => {
      const style = parseCssInJsToInlineCss(styles.tr as Record<string, unknown>);
      return `<tr${style ? ` style="${style}"` : ''}>\n${text}</tr>\n`;
    };

    return marked.parse(local.children, {
      renderer,
      async: false,
    }) as string;
  };

  return (
    <div
      {...others}
      innerHTML={renderedHtml()}
      data-id="solidjs-email-markdown"
      style={local.markdownContainerStyles}
    />
  );
};

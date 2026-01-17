import { render } from '@monkedevlife/solidjs-email-render';
import { describe, expect, it } from 'vitest';
import { Markdown } from './markdown';

describe('<Markdown> component', () => {
  it('renders a div with data-id attribute', async () => {
    const html = await render(() => <Markdown>Hello</Markdown>);
    expect(html).toContain('data-id="solidjs-email-markdown"');
  });

  it('renders paragraph text', async () => {
    const html = await render(() => <Markdown>Hello world</Markdown>);
    expect(html).toContain('<p>Hello world</p>');
  });

  it('renders headings', async () => {
    const html = await render(() => <Markdown># Heading 1</Markdown>);
    expect(html).toContain('<h1');
    expect(html).toContain('Heading 1');
    expect(html).toContain('</h1>');
  });

  it('renders bold text', async () => {
    const html = await render(() => <Markdown>**bold text**</Markdown>);
    expect(html).toContain('<strong');
    expect(html).toContain('bold text');
    expect(html).toContain('</strong>');
  });

  it('renders italic text', async () => {
    const html = await render(() => <Markdown>*italic text*</Markdown>);
    expect(html).toContain('<em');
    expect(html).toContain('italic text');
    expect(html).toContain('</em>');
  });

  it('renders links with target="_blank"', async () => {
    const html = await render(() => (
      <Markdown>[Example](https://example.com)</Markdown>
    ));
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Example</a>');
  });

  it('renders unordered lists', async () => {
    const markdown = `
- Item 1
- Item 2
- Item 3`;
    const html = await render(() => <Markdown>{markdown}</Markdown>);
    expect(html).toContain('<ul');
    expect(html).toContain('<li');
    expect(html).toContain('Item 1');
    expect(html).toContain('Item 2');
    expect(html).toContain('Item 3');
  });

  it('renders ordered lists', async () => {
    const markdown = `
1. First
2. Second
3. Third`;
    const html = await render(() => <Markdown>{markdown}</Markdown>);
    expect(html).toContain('<ol');
    expect(html).toContain('<li');
    expect(html).toContain('First');
    expect(html).toContain('Second');
    expect(html).toContain('Third');
  });

  it('renders code blocks', async () => {
    const markdown = '```\nconst x = 1;\n```';
    const html = await render(() => <Markdown>{markdown}</Markdown>);
    expect(html).toContain('<pre');
    expect(html).toContain('<code>');
    expect(html).toContain('const x = 1;');
  });

  it('renders inline code', async () => {
    const html = await render(() => <Markdown>Use `npm install`</Markdown>);
    expect(html).toContain('<code');
    expect(html).toContain('npm install');
    expect(html).toContain('</code>');
  });

  it('renders blockquotes', async () => {
    const html = await render(() => <Markdown>> Quote text</Markdown>);
    expect(html).toContain('<blockquote');
    expect(html).toContain('Quote text');
    expect(html).toContain('</blockquote>');
  });

  it('renders horizontal rules', async () => {
    const html = await render(() => <Markdown>---</Markdown>);
    expect(html).toContain('<hr');
  });

  it('applies custom container styles', async () => {
    const html = await render(() => (
      <Markdown markdownContainerStyles={{ padding: '20px' }}>
        Hello
      </Markdown>
    ));
    expect(html).toContain('padding');
  });

  it('applies custom markdown styles', async () => {
    const html = await render(() => (
      <Markdown
        markdownCustomStyles={{
          h1: { color: 'red', fontSize: '3rem' },
        }}
      >
        # Custom Heading
      </Markdown>
    ));
    expect(html).toContain('color:red');
    expect(html).toContain('font-size:3rem');
  });

  it('renders images', async () => {
    const html = await render(() => (
      <Markdown>![Alt text](https://example.com/image.png)</Markdown>
    ));
    expect(html).toContain('<img');
    expect(html).toContain('src="https://example.com/image.png"');
    expect(html).toContain('alt="Alt text"');
  });
});

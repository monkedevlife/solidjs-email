import { describe, it, expect } from 'vitest';
import { render } from '@solidjs-email/render';
import { CodeInline } from './index';

describe('<CodeInline> component', () => {
  it('renders code element with children', async () => {
    const html = await render(() => <CodeInline>const foo = "bar"</CodeInline>);
    expect(html).toContain('<code');
    expect(html).toContain('const foo = "bar"');
  });

  it('renders both code and span elements for Orange.fr compatibility', async () => {
    const html = await render(() => <CodeInline>test</CodeInline>);
    expect(html).toContain('<code');
    expect(html).toContain('<span');
  });

  it('includes cino class on code element', async () => {
    const html = await render(() => <CodeInline>test</CodeInline>);
    expect(html).toContain('class="cino"');
  });

  it('includes cio class on span element', async () => {
    const html = await render(() => <CodeInline>test</CodeInline>);
    expect(html).toContain('class="cio"');
  });

  it('applies custom class to both elements', async () => {
    const html = await render(() => (
      <CodeInline class="custom-code">test</CodeInline>
    ));
    expect(html).toContain('class="custom-code cino"');
    expect(html).toContain('class="custom-code cio"');
  });

  it('renders style tag for Orange.fr fix', async () => {
    const html = await render(() => <CodeInline>test</CodeInline>);
    expect(html).toMatch(/<style[^>]*>/);
    expect(html).toContain('meta ~ .cino');
    expect(html).toContain('meta ~ .cio');
  });

  it('span has display:none by default', async () => {
    const html = await render(() => <CodeInline>test</CodeInline>);
    expect(html).toContain('display:none');
  });

  it('passes through additional props', async () => {
    const html = await render(() => (
      <CodeInline data-testid="inline-code">test</CodeInline>
    ));
    expect(html).toContain('data-testid="inline-code"');
  });
});

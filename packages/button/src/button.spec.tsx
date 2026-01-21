import { describe, it, expect } from 'vitest';
import { Button } from './button';
import { render } from '@solidjs-email/render';

describe('<Button> component', () => {
  it('renders as an anchor element', async () => {
    const html = await render(() => <Button href="https://example.com">Click me</Button>);
    expect(html).toContain('<a');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('Click me');
  });

  it('sets target="_blank" by default', async () => {
    const html = await render(() => <Button href="https://example.com">Test</Button>);
    expect(html).toContain('target="_blank"');
  });

  it('allows overriding target attribute', async () => {
    const html = await render(() => (
      <Button href="https://example.com" target="_self">Test</Button>
    ));
    expect(html).toContain('target="_self"');
  });

  it('applies default styles', async () => {
    const html = await render(() => <Button href="https://example.com">Test</Button>);
    expect(html).toContain('display:inline-block');
    expect(html).toContain('text-decoration:none');
    expect(html).toContain('line-height:100%');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Button
        href="https://example.com"
        style={{ 'background-color': '#000', color: '#fff' }}
      >
        Test
      </Button>
    ));
    expect(html).toContain('background-color:#000');
    expect(html).toContain('color:#fff');
  });

  it('renders with padding and MSO-specific hacks', async () => {
    const html = await render(() => (
      <Button
        href="https://example.com"
        style={{ padding: '12px 20px' }}
      >
        Test
      </Button>
    ));
    expect(html).toContain('padding-top:12px');
    expect(html).toContain('padding-bottom:12px');
    expect(html).toContain('padding-left:20px');
    expect(html).toContain('padding-right:20px');
    expect(html).toContain('<!--[if mso]>');
  });

  it('renders children in inner span', async () => {
    const html = await render(() => (
      <Button href="https://example.com">
        <strong>Bold Text</strong>
      </Button>
    ));
    expect(html).toContain('<strong');
    expect(html).toContain('Bold Text</strong>');
  });
});

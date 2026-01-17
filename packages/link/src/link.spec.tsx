import { describe, it, expect } from 'vitest';
import { Link } from './link';
import { render } from '@solidjs-email/render';

describe('<Link> component', () => {
  it('renders as an anchor element', async () => {
    const html = await render(() => <Link href="https://example.com">Click me</Link>);
    expect(html).toContain('<a');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('Click me');
  });

  it('sets target="_blank" by default', async () => {
    const html = await render(() => <Link href="https://example.com">Test</Link>);
    expect(html).toContain('target="_blank"');
  });

  it('allows overriding target attribute', async () => {
    const html = await render(() => (
      <Link href="https://example.com" target="_self">Test</Link>
    ));
    expect(html).toContain('target="_self"');
  });

  it('applies default styles', async () => {
    const html = await render(() => <Link href="https://example.com">Test</Link>);
    expect(html).toContain('color:#067df7');
    expect(html).toContain('text-decoration-line:none');
  });

  it('allows overriding color', async () => {
    const html = await render(() => (
      <Link href="https://example.com" style={{ color: '#ff0000' }}>
        Test
      </Link>
    ));
    expect(html).toContain('color:#ff0000');
  });

  it('allows adding text-decoration', async () => {
    const html = await render(() => (
      <Link href="https://example.com" style={{ 'text-decoration-line': 'underline' }}>
        Test
      </Link>
    ));
    expect(html).toContain('text-decoration-line:underline');
  });

  it('passes additional props to anchor element', async () => {
    const html = await render(() => (
      <Link href="https://example.com" id="link-1" class="my-link" rel="noopener">
        Test
      </Link>
    ));
    expect(html).toContain('id="link-1"');
    expect(html).toContain('class="my-link');
    expect(html).toContain('rel="noopener"');
  });

  it('renders children correctly', async () => {
    const html = await render(() => (
      <Link href="https://example.com">
        <strong>Bold Link</strong>
      </Link>
    ));
    expect(html).toContain('<strong');
    expect(html).toContain('Bold Link</strong>');
  });
});

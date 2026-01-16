import { describe, it, expect } from 'vitest';
import { render } from './render';

describe('render', () => {
  it('renders a simple element', async () => {
    const html = await render(() => <div>Hello</div>);
    expect(html).toContain('Hello');
    expect(html).toContain('<!DOCTYPE html');
  });

  it('includes XHTML doctype', async () => {
    const html = await render(() => <div>Test</div>);
    expect(html).toContain('XHTML 1.0 Transitional');
  });

  it('renders nested elements', async () => {
    const html = await render(() => (
      <div>
        <span>Nested</span>
      </div>
    ));
    expect(html).toContain('<span>Nested</span>');
  });

  it('renders with attributes', async () => {
    const html = await render(() => (
      <a href="https://example.com">Link</a>
    ));
    expect(html).toContain('href="https://example.com"');
  });

  it('renders style attributes', async () => {
    const html = await render(() => (
      <div style={{ color: 'red' }}>Styled</div>
    ));
    expect(html).toContain('color');
  });

  it('returns pretty HTML when option is set', async () => {
    const html = await render(
      () => <div><span>Hello</span></div>,
      { pretty: true }
    );
    expect(html).toContain('\n');
  });
});

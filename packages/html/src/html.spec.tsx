import { describe, it, expect } from 'vitest';
import { Html } from './html';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Html> component', () => {
  it('renders with default lang and dir', async () => {
    const html = await render(() => <Html />);
    expect(html).toContain('lang="en"');
    expect(html).toContain('dir="ltr"');
  });

  it('renders children', async () => {
    const html = await render(() => (
      <Html>
        <body>Hello World</body>
      </Html>
    ));
    expect(html).toContain('Hello World');
  });

  it('accepts custom lang', async () => {
    const html = await render(() => <Html lang="fr" />);
    expect(html).toContain('lang="fr"');
  });

  it('accepts custom dir', async () => {
    const html = await render(() => <Html dir="rtl" />);
    expect(html).toContain('dir="rtl"');
  });

  it('matches expected structure', async () => {
    const html = await render(() => (
      <Html lang="en" dir="ltr">
        <head><title>Test</title></head>
        <body>Content</body>
      </Html>
    ));
    expect(html).toContain('<!DOCTYPE html PUBLIC');
    expect(html).toContain('<html');
    expect(html).toContain('lang="en"');
    expect(html).toContain('dir="ltr"');
    expect(html).toContain('<title>Test</title>');
    expect(html).toContain('>Content</body>');
    expect(html).toContain('</html>');
  });
});

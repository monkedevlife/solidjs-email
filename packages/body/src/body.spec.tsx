import { describe, it, expect } from 'vitest';
import { Body } from './body';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Body> component', () => {
  it('renders with table structure for email compatibility', async () => {
    const html = await render(() => <Body>Content</Body>);
    expect(html).toContain('<table');
    expect(html).toContain('role="presentation"');
    expect(html).toContain('<tbody>');
    expect(html).toContain('<tr>');
    expect(html).toContain('<td');
  });

  it('renders children inside td', async () => {
    const html = await render(() => (
      <Body>
        <div>Hello World</div>
      </Body>
    ));
    expect(html).toContain('Hello World');
  });

  it('applies background color to body', async () => {
    const html = await render(() => (
      <Body style={{ 'background-color': '#f0f0f0' }}>
        Content
      </Body>
    ));
    expect(html).toContain('background-color');
  });

  it('applies styles to inner td', async () => {
    const html = await render(() => (
      <Body style={{ padding: '20px' }}>
        Content
      </Body>
    ));
    expect(html).toContain('padding');
  });

  it('sets table attributes for email clients', async () => {
    const html = await render(() => <Body>Content</Body>);
    expect(html).toContain('cellpadding="0"');
    expect(html).toContain('cellspacing="0"');
    expect(html).toContain('width="100%"');
    expect(html).toContain('align="center"');
  });
});

import { describe, it, expect } from 'vitest';
import { Container } from './container';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Container> component', () => {
  it('renders as a table element', async () => {
    const html = await render(() => <Container>Content</Container>);
    expect(html).toContain('<table');
    expect(html).toContain('</table>');
  });

  it('renders children inside td', async () => {
    const html = await render(() => (
      <Container>
        <div>Hello World</div>
      </Container>
    ));
    expect(html).toContain('<td>');
    expect(html).toContain('Hello World');
  });

  it('sets max-width default to 37.5em', async () => {
    const html = await render(() => <Container>Content</Container>);
    expect(html).toContain('max-width:37.5em');
  });

  it('sets table attributes for email clients', async () => {
    const html = await render(() => <Container>Content</Container>);
    expect(html).toContain('align="center"');
    expect(html).toContain('width="100%"');
    expect(html).toContain('cellPadding="0"');
    expect(html).toContain('cellSpacing="0"');
    expect(html).toContain('role="presentation"');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Container style={{ 'background-color': '#f0f0f0' }}>
        Content
      </Container>
    ));
    expect(html).toContain('background-color:#f0f0f0');
  });

  it('allows overriding max-width', async () => {
    const html = await render(() => (
      <Container style={{ 'max-width': '600px' }}>
        Content
      </Container>
    ));
    expect(html).toContain('max-width:600px');
  });

  it('has correct table structure with tbody and tr', async () => {
    const html = await render(() => <Container>Content</Container>);
    expect(html).toContain('<tbody>');
    expect(html).toContain('<tr');
    expect(html).toContain('width:100%');
  });
});

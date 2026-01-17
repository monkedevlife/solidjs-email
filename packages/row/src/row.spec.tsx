import { describe, it, expect } from 'vitest';
import { Row } from './row';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Row> component', () => {
  it('renders as a table element', async () => {
    const html = await render(() => <Row>Content</Row>);
    expect(html).toContain('<table');
    expect(html).toContain('</table>');
  });

  it('renders children inside tr', async () => {
    const html = await render(() => (
      <Row>
        <td>Cell 1</td>
        <td>Cell 2</td>
      </Row>
    ));
    expect(html).toContain('<tr');
    expect(html).toContain('Cell 1');
    expect(html).toContain('Cell 2');
  });

  it('sets table attributes for email clients', async () => {
    const html = await render(() => <Row>Content</Row>);
    expect(html).toContain('align="center"');
    expect(html).toContain('width="100%"');
    expect(html).toContain('cellPadding="0"');
    expect(html).toContain('cellSpacing="0"');
    expect(html).toContain('role="presentation"');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Row style={{ 'background-color': '#eee' }}>
        Content
      </Row>
    ));
    expect(html).toContain('background-color:#eee');
  });

  it('has correct structure with tbody and tr having width 100%', async () => {
    const html = await render(() => <Row>Content</Row>);
    expect(html).toContain('<tbody');
    expect(html).toContain('width:100%');
  });

  it('passes additional props to table element', async () => {
    const html = await render(() => (
      <Row id="row-1">
        Content
      </Row>
    ));
    expect(html).toContain('id="row-1"');
  });
});

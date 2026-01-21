import { describe, it, expect } from 'vitest';
import { Column } from './column';
import { render } from '@solidjs-email/render';

describe('<Column> component', () => {
  it('renders as a td element', async () => {
    const html = await render(() => <Column>Content</Column>);
    expect(html).toContain('<td');
    expect(html).toContain('</td>');
  });

  it('renders children correctly', async () => {
    const html = await render(() => (
      <Column>
        <div>Column Content</div>
      </Column>
    ));
    expect(html).toContain('Column Content');
  });

  it('has data-id attribute for identification', async () => {
    const html = await render(() => <Column>Content</Column>);
    expect(html).toContain('data-id="__solidjs-email-column"');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Column style={{ 'vertical-align': 'top', width: '50%' }}>
        Content
      </Column>
    ));
    expect(html).toContain('vertical-align:top');
    expect(html).toContain('width:50%');
  });

  it('passes additional props to td element', async () => {
    const html = await render(() => (
      <Column id="col-1" class="my-column" colSpan={2}>
        Content
      </Column>
    ));
    expect(html).toContain('id="col-1"');
    expect(html).toContain('class="my-column');
    expect(html).toContain('colSpan="2"');
  });

  it('works with Row component', async () => {
    const { Row } = await import('@solidjs-email/row');
    const html = await render(() => (
      <Row>
        <Column>Cell 1</Column>
        <Column>Cell 2</Column>
      </Row>
    ));
    expect(html).toContain('Cell 1');
    expect(html).toContain('Cell 2');
    expect(html).toContain('data-id="__solidjs-email-column"');
  });
});

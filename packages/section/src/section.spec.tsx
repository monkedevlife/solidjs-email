import { describe, it, expect } from 'vitest';
import { Section } from './section';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Section> component', () => {
  it('renders as a table element', async () => {
    const html = await render(() => <Section>Content</Section>);
    expect(html).toContain('<table');
    expect(html).toContain('</table>');
  });

  it('renders children inside td', async () => {
    const html = await render(() => (
      <Section>
        <div>Section Content</div>
      </Section>
    ));
    expect(html).toContain('<td>');
    expect(html).toContain('Section Content');
  });

  it('sets table attributes for email clients', async () => {
    const html = await render(() => <Section>Content</Section>);
    expect(html).toContain('align="center"');
    expect(html).toContain('width="100%"');
    expect(html).toContain('cellPadding="0"');
    expect(html).toContain('cellSpacing="0"');
    expect(html).toContain('role="presentation"');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Section style={{ padding: '20px', 'background-color': '#fff' }}>
        Content
      </Section>
    ));
    expect(html).toContain('padding:20px');
    expect(html).toContain('background-color:#fff');
  });

  it('has correct table structure with tbody and tr', async () => {
    const html = await render(() => <Section>Content</Section>);
    expect(html).toContain('<tbody>');
    expect(html).toContain('<tr>');
  });

  it('passes additional props to table element', async () => {
    const html = await render(() => (
      <Section id="section-1" class="my-section">
        Content
      </Section>
    ));
    expect(html).toContain('id="section-1"');
    expect(html).toContain('class="my-section');
  });
});

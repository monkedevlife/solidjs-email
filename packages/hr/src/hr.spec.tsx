import { describe, it, expect } from 'vitest';
import { Hr } from './hr';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Hr> component', () => {
  it('renders as an hr element', async () => {
    const html = await render(() => <Hr />);
    expect(html).toContain('<hr');
  });

  it('applies default styles', async () => {
    const html = await render(() => <Hr />);
    expect(html).toContain('width:100%');
    expect(html).toContain('border:none');
    expect(html).toContain('border-top:1px solid #eaeaea');
  });

  it('allows overriding border-top', async () => {
    const html = await render(() => (
      <Hr style={{ 'border-top': '2px solid #000' }} />
    ));
    expect(html).toContain('border-top:2px solid #000');
  });

  it('allows overriding width', async () => {
    const html = await render(() => (
      <Hr style={{ width: '50%' }} />
    ));
    expect(html).toContain('width:50%');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Hr style={{ margin: '20px 0' }} />
    ));
    expect(html).toContain('margin:20px 0');
  });

  it('passes additional props to hr element', async () => {
    const html = await render(() => (
      <Hr id="divider" class="my-hr" />
    ));
    expect(html).toContain('id="divider"');
    expect(html).toContain('class="my-hr');
  });
});

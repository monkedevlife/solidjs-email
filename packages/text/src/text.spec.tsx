import { describe, it, expect } from 'vitest';
import { Text } from './text';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Text> component', () => {
  it('renders as a p element', async () => {
    const html = await render(() => <Text>Hello World</Text>);
    expect(html).toContain('<p');
    expect(html).toContain('</p>');
    expect(html).toContain('Hello World');
  });

  it('applies default styles', async () => {
    const html = await render(() => <Text>Content</Text>);
    expect(html).toContain('font-size:14px');
    expect(html).toContain('line-height:24px');
    expect(html).toContain('margin-top:16px');
    expect(html).toContain('margin-bottom:16px');
  });

  it('allows overriding font-size and line-height', async () => {
    const html = await render(() => (
      <Text style={{ 'font-size': '18px', 'line-height': '28px' }}>
        Content
      </Text>
    ));
    expect(html).toContain('font-size:18px');
    expect(html).toContain('line-height:28px');
  });

  it('allows overriding margins', async () => {
    const html = await render(() => (
      <Text style={{ 'margin-top': '0px', 'margin-bottom': '8px' }}>
        Content
      </Text>
    ));
    expect(html).toContain('margin-top:0px');
    expect(html).toContain('margin-bottom:8px');
  });

  it('supports margin shorthand', async () => {
    const html = await render(() => (
      <Text style={{ margin: '10px 20px' }}>
        Content
      </Text>
    ));
    expect(html).toContain('margin-top:10px');
    expect(html).toContain('margin-bottom:10px');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Text style={{ color: '#333', 'text-align': 'center' }}>
        Content
      </Text>
    ));
    expect(html).toContain('color:#333');
    expect(html).toContain('text-align:center');
  });

  it('passes additional props to p element', async () => {
    const html = await render(() => (
      <Text id="text-1" class="my-text">
        Content
      </Text>
    ));
    expect(html).toContain('id="text-1"');
    expect(html).toContain('class="my-text');
  });
});

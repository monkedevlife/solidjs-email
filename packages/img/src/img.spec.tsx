import { describe, it, expect } from 'vitest';
import { Img } from './img';
import { render } from '@solidjs-email/render';

describe('<Img> component', () => {
  it('renders as an img element', async () => {
    const html = await render(() => <Img src="https://example.com/image.png" />);
    expect(html).toContain('<img');
    expect(html).toContain('src="https://example.com/image.png"');
  });

  it('renders with alt text', async () => {
    const html = await render(() => (
      <Img src="https://example.com/image.png" alt="Example image" />
    ));
    expect(html).toContain('alt="Example image"');
  });

  it('renders with width and height', async () => {
    const html = await render(() => (
      <Img src="https://example.com/image.png" width={200} height={100} />
    ));
    expect(html).toContain('width="200"');
    expect(html).toContain('height="100"');
  });

  it('applies default styles for email compatibility', async () => {
    const html = await render(() => <Img src="https://example.com/image.png" />);
    expect(html).toContain('display:block');
    expect(html).toContain('outline:none');
    expect(html).toContain('border:none');
    expect(html).toContain('text-decoration:none');
  });

  it('allows overriding default styles', async () => {
    const html = await render(() => (
      <Img
        src="https://example.com/image.png"
        style={{ display: 'inline', border: '1px solid #ccc' }}
      />
    ));
    expect(html).toContain('display:inline');
    expect(html).toContain('border:1px solid #ccc');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Img
        src="https://example.com/image.png"
        style={{ 'border-radius': '8px', 'margin-top': '10px' }}
      />
    ));
    expect(html).toContain('border-radius:8px');
    expect(html).toContain('margin-top:10px');
  });

  it('passes additional props to img element', async () => {
    const html = await render(() => (
      <Img
        src="https://example.com/image.png"
        id="logo"
        class="image"
        loading="lazy"
      />
    ));
    expect(html).toContain('id="logo"');
    expect(html).toContain('class="image');
    expect(html).toContain('loading="lazy"');
  });
});

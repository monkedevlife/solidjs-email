import { describe, it, expect } from 'vitest';
import { Preview } from './preview';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Preview> component', () => {
  it('renders as a hidden div', async () => {
    const html = await render(() => <Preview>Preview text</Preview>);
    expect(html).toContain('<div');
    expect(html).toContain('display:none');
  });

  it('renders preview text', async () => {
    const html = await render(() => <Preview>This is the preview text</Preview>);
    expect(html).toContain('This is the preview text');
  });

  it('applies hidden styles for email clients', async () => {
    const html = await render(() => <Preview>Text</Preview>);
    expect(html).toContain('display:none');
    expect(html).toContain('overflow:hidden');
    expect(html).toContain('line-height:1px');
    expect(html).toContain('opacity:0');
    expect(html).toContain('max-height:0');
    expect(html).toContain('max-width:0');
  });

  it('has data-skip-in-text attribute', async () => {
    const html = await render(() => <Preview>Text</Preview>);
    expect(html).toContain('data-skip-in-text');
  });

  it('accepts array of strings as children', async () => {
    const html = await render(() => (
      <Preview>{['Part 1', 'Part 2', 'Part 3']}</Preview>
    ));
    expect(html).toContain('Part 1Part 2Part 3');
  });

  it('truncates text to 150 characters', async () => {
    const longText = 'A'.repeat(200);
    const html = await render(() => <Preview>{longText}</Preview>);
    const truncated = 'A'.repeat(150);
    expect(html).toContain(truncated);
    expect(html).not.toContain(longText);
  });

  it('adds whitespace padding for short text', async () => {
    const shortText = 'Short';
    const html = await render(() => <Preview>{shortText}</Preview>);
    expect(html).toContain(shortText);
    expect(html).toContain('\xa0'); // non-breaking space
  });

  it('passes additional props to div element', async () => {
    const html = await render(() => (
      <Preview id="preview" class="email-preview">Preview</Preview>
    ));
    expect(html).toContain('id="preview"');
    expect(html).toContain('class="email-preview');
  });
});

import { render } from '@solidjs-email/render';
import { describe, expect, it } from 'vitest';
import { Font } from './font';

describe('<Font> component', () => {
  it('renders a style tag', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" />
    ));
    expect(html).toMatch(/<style[^>]*>/);
    expect(html).toContain('</style>');
  });

  it('includes font-family in @font-face', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" />
    ));
    expect(html).toContain("font-family: 'Roboto'");
  });

  it('includes fallback font family', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" />
    ));
    expect(html).toContain("font-family: 'Roboto', Arial");
  });

  it('handles array of fallback fonts', async () => {
    const html = await render(() => (
      <Font
        fontFamily="Roboto"
        fallbackFontFamily={['Arial', 'Helvetica', 'sans-serif']}
      />
    ));
    expect(html).toContain("font-family: 'Roboto', Arial, Helvetica, sans-serif");
  });

  it('includes mso-font-alt for Outlook', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" />
    ));
    expect(html).toContain("mso-font-alt: 'Arial'");
  });

  it('uses first fallback for mso-font-alt when array', async () => {
    const html = await render(() => (
      <Font
        fontFamily="Roboto"
        fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
      />
    ));
    expect(html).toContain("mso-font-alt: 'Helvetica'");
  });

  it('includes webFont src when provided', async () => {
    const html = await render(() => (
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Arial"
        webFont={{
          url: 'https://fonts.example.com/roboto.woff2',
          format: 'woff2',
        }}
      />
    ));
    expect(html).toContain("src: url(https://fonts.example.com/roboto.woff2) format('woff2')");
  });

  it('uses default font-style of normal', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" />
    ));
    expect(html).toContain('font-style: normal');
  });

  it('uses default font-weight of 400', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" />
    ));
    expect(html).toContain('font-weight: 400');
  });

  it('accepts custom font-style', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" fontStyle="italic" />
    ));
    expect(html).toContain('font-style: italic');
  });

  it('accepts custom font-weight', async () => {
    const html = await render(() => (
      <Font fontFamily="Roboto" fallbackFontFamily="Arial" fontWeight={700} />
    ));
    expect(html).toContain('font-weight: 700');
  });
});

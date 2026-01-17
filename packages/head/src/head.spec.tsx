import { describe, it, expect } from 'vitest';
import { Head } from './head';
import { render } from '@monkedevlife/solidjs-email-render';

describe('<Head> component', () => {
  it('renders meta charset tag', async () => {
    const html = await render(() => <Head />);
    expect(html).toContain('charset=UTF-8');
  });

  it('renders apple disable message reformatting meta', async () => {
    const html = await render(() => <Head />);
    expect(html).toContain('x-apple-disable-message-reformatting');
  });

  it('renders children', async () => {
    const html = await render(() => (
      <Head>
        <title>My Email</title>
      </Head>
    ));
    expect(html).toContain('>My Email</title>');
  });

  it('renders custom meta tags', async () => {
    const html = await render(() => (
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
    ));
    expect(html).toContain('viewport');
  });
});

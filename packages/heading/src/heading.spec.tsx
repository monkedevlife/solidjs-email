import { describe, it, expect } from 'vitest';
import { Heading } from './heading';
import { render } from '@solidjs-email/render';

describe('<Heading> component', () => {
  it('renders as h1 by default', async () => {
    const html = await render(() => <Heading>Title</Heading>);
    expect(html).toContain('<h1');
    expect(html).toContain('</h1>');
    expect(html).toContain('Title');
  });

  it('renders as h2 when specified', async () => {
    const html = await render(() => <Heading as="h2">Subtitle</Heading>);
    expect(html).toContain('<h2');
    expect(html).toContain('</h2>');
  });

  it('renders as h3 when specified', async () => {
    const html = await render(() => <Heading as="h3">Section</Heading>);
    expect(html).toContain('<h3');
    expect(html).toContain('</h3>');
  });

  it('renders as h4, h5, h6 when specified', async () => {
    const h4 = await render(() => <Heading as="h4">H4</Heading>);
    const h5 = await render(() => <Heading as="h5">H5</Heading>);
    const h6 = await render(() => <Heading as="h6">H6</Heading>);

    expect(h4).toContain('<h4');
    expect(h5).toContain('<h5');
    expect(h6).toContain('<h6');
  });

  it('applies margin shorthand with m prop', async () => {
    const html = await render(() => <Heading m={10}>Title</Heading>);
    expect(html).toContain('margin:10px');
  });

  it('applies horizontal margins with mx prop', async () => {
    const html = await render(() => <Heading mx={20}>Title</Heading>);
    expect(html).toContain('margin-left:20px');
    expect(html).toContain('margin-right:20px');
  });

  it('applies vertical margins with my prop', async () => {
    const html = await render(() => <Heading my={15}>Title</Heading>);
    expect(html).toContain('margin-top:15px');
    expect(html).toContain('margin-bottom:15px');
  });

  it('applies individual margin props', async () => {
    const html = await render(() => (
      <Heading mt={10} mr={20} mb={30} ml={40}>
        Title
      </Heading>
    ));
    expect(html).toContain('margin-top:10px');
    expect(html).toContain('margin-right:20px');
    expect(html).toContain('margin-bottom:30px');
    expect(html).toContain('margin-left:40px');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Heading style={{ 'font-size': '32px', color: '#333' }}>
        Title
      </Heading>
    ));
    expect(html).toContain('font-size:32px');
    expect(html).toContain('color:#333');
  });

  it('passes additional props to heading element', async () => {
    const html = await render(() => (
      <Heading id="main-title" class="heading">
        Title
      </Heading>
    ));
    expect(html).toContain('id="main-title"');
    expect(html).toContain('class="heading');
  });
});

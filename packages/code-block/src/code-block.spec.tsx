import { describe, it, expect } from 'vitest';
import { render } from '@solidjs-email/render';
import { CodeBlock, dracula } from './index';

describe('<CodeBlock> component', () => {
  it('renders code with syntax highlighting', async () => {
    const html = await render(() => (
      <CodeBlock
        code="const foo = 'bar';"
        language="javascript"
        theme={dracula}
      />
    ));
    expect(html).toContain('<pre');
    expect(html).toContain('<code');
    expect(html).toContain('const');
    expect(html).toContain('foo');
  });

  it('renders multiline code', async () => {
    const code = `const x = 1;
const y = 2;
const z = x + y;`;
    const html = await render(() => (
      <CodeBlock code={code} language="javascript" theme={dracula} />
    ));
    expect(html).toContain('<br');
    expect(html).toContain('const');
  });

  it('renders line numbers when enabled', async () => {
    const code = `line 1
line 2
line 3`;
    const html = await render(() => (
      <CodeBlock code={code} language="javascript" theme={dracula} lineNumbers />
    ));
    expect(html).toContain('>1<');
    expect(html).toContain('>2<');
    expect(html).toContain('>3<');
  });

  it('applies theme base styles', async () => {
    const html = await render(() => (
      <CodeBlock code="test" language="javascript" theme={dracula} />
    ));
    expect(html).toContain('background');
  });

  it('applies custom style', async () => {
    const html = await render(() => (
      <CodeBlock
        code="test"
        language="javascript"
        theme={dracula}
        style={{ 'max-width': '500px' }}
      />
    ));
    expect(html).toContain('max-width:500px');
  });

  it('supports TypeScript language', async () => {
    const code = `const greeting: string = 'Hello';`;
    const html = await render(() => (
      <CodeBlock code={code} language="typescript" theme={dracula} />
    ));
    expect(html).toContain('greeting');
    expect(html).toContain('string');
  });

  it('supports custom fontFamily', async () => {
    const html = await render(() => (
      <CodeBlock
        code="test"
        language="javascript"
        theme={dracula}
        fontFamily="Monaco, monospace"
      />
    ));
    expect(html).toContain('Monaco');
  });

  it('throws error for unsupported language', async () => {
    await expect(async () => {
      await render(() => (
        <CodeBlock
          code="test"
          language={'invalid-lang' as any}
          theme={dracula}
        />
      ));
    }).rejects.toThrow('There is no language defined on Prism');
  });
});

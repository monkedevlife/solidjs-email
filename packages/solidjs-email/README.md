# solidjs-email

Build and send emails using SolidJS components.

## Installation

```bash
npm install solidjs-email solid-js
# or
pnpm add solidjs-email solid-js
# or
yarn add solidjs-email solid-js
```

## Usage

```tsx
import { render, Html, Head, Body, Container, Text, Button } from 'solidjs-email';

const Email = () => (
  <Html>
    <Head />
    <Body>
      <Container>
        <Text>Hello from SolidJS Email!</Text>
        <Button href="https://example.com">Click me</Button>
      </Container>
    </Body>
  </Html>
);

const html = await render(() => <Email />);
console.log(html);
```

## Components

This package exports all components from the `@solidjs-email/*` packages:

- `Body` - Email body wrapper
- `Button` - Call-to-action button
- `CodeBlock` - Syntax highlighted code block
- `CodeInline` - Inline code snippet
- `Column` - Table column for layouts
- `Container` - Centered content container
- `Font` - Custom font loader
- `Head` - Email head section
- `Heading` - Heading elements (h1-h6)
- `Hr` - Horizontal rule
- `Html` - Root HTML wrapper
- `Img` - Image component
- `Link` - Anchor link
- `Markdown` - Markdown renderer
- `Preview` - Preview text (visible in inbox)
- `Row` - Table row for layouts
- `Section` - Content section
- `Tailwind` - Tailwind CSS support
- `Text` - Paragraph text

## Rendering

```tsx
import { render } from 'solidjs-email';

// Basic render
const html = await render(() => <Email />);

// With options
const prettyHtml = await render(() => <Email />, {
  pretty: true,
});

// Plain text output
const text = await render(() => <Email />, {
  plainText: true,
});

// With Tailwind CSS
const htmlWithTailwind = await render(() => <Email />, {
  tailwind: {
    config: { theme: { extend: {} } },
  },
});
```

## Packages

If you prefer to install individual components:

- `@solidjs-email/body`
- `@solidjs-email/button`
- `@solidjs-email/code-block`
- `@solidjs-email/code-inline`
- `@solidjs-email/column`
- `@solidjs-email/container`
- `@solidjs-email/font`
- `@solidjs-email/head`
- `@solidjs-email/heading`
- `@solidjs-email/hr`
- `@solidjs-email/html`
- `@solidjs-email/img`
- `@solidjs-email/link`
- `@solidjs-email/markdown`
- `@solidjs-email/preview`
- `@solidjs-email/render`
- `@solidjs-email/row`
- `@solidjs-email/section`
- `@solidjs-email/tailwind`
- `@solidjs-email/text`

## License

MIT

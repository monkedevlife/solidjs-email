# @monkedevlife/solidjs-email-components

[![npm version](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-components.svg)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-components)

All SolidJS email components in one package.

## Installation

```bash
npm install @monkedevlife/solidjs-email-components
```

## Usage

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
  render,
} from '@monkedevlife/solidjs-email-components';

const Email = () => (
  <Html>
    <Head />
    <Tailwind>
      <Body class="bg-white font-sans">
        <Preview>Welcome!</Preview>
        <Container class="mx-auto max-w-[560px] p-4">
          <Heading class="text-2xl font-bold">Hello!</Heading>
          <Text class="text-gray-600">Welcome to our platform.</Text>
          <Button class="bg-blue-600 text-white px-4 py-2" href="https://example.com">
            Get Started
          </Button>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

const html = await render(() => <Email />);
```

## Included Components

- `Html` - Root HTML wrapper
- `Head` - Email head with meta tags
- `Body` - Body with table layout
- `Container` - Centered container
- `Section` - Table section
- `Row` - Table row
- `Column` - Table column
- `Button` - CTA button link
- `Text` - Paragraph text
- `Heading` - h1-h6 headings
- `Link` - Anchor link
- `Img` - Image
- `Hr` - Horizontal rule
- `Preview` - Preview text (hidden)
- `Font` - Custom web fonts
- `Markdown` - Markdown to HTML
- `Tailwind` - Tailwind CSS support
- `render` - HTML rendering function

## License

MIT

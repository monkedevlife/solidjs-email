<div align="center"><strong>SolidJS Email</strong></div>
<div align="center">Build emails with SolidJS components.<br />A port of react-email for the SolidJS ecosystem.</div>
<br />
<div align="center">
<a href="https://www.npmjs.com/package/solidjs-email">
  <img src="https://img.shields.io/npm/v/solidjs-email.svg" alt="npm version" />
</a>
<a href="https://github.com/solidjs-email/solidjs-email/blob/main/LICENSE">
  <img src="https://img.shields.io/npm/l/solidjs-email.svg" alt="license" />
</a>
</div>

> **Note:** This project is vibecoded. Expect rough edges, missing features, and
> the occasional existential crisis in the codebase.

## Introduction

A collection of unstyled components for creating emails using SolidJS and TypeScript. Inspired by [react-email](https://react.email), but for SolidJS.

Build responsive emails with Tailwind CSS support without fighting email client inconsistencies.

## Installation

```bash
# Install the main package (recommended)
npm install solidjs-email solid-js

# Or with pnpm
pnpm add solidjs-email solid-js

# Or with yarn
yarn add solidjs-email solid-js
```

### Individual Packages

You can also install individual packages if you prefer:

```bash
npm install @solidjs-email/render @solidjs-email/button @solidjs-email/container solid-js
```

## Quick Start

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  render,
  Section,
  Tailwind,
  Text,
} from 'solidjs-email';

const WelcomeEmail = (props: { name: string }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body class="bg-white font-sans">
        <Preview>Welcome to our platform!</Preview>
        <Container class="mx-auto max-w-[560px] px-4 py-8">
          <Heading class="text-2xl font-bold text-gray-900">
            Hello, {props.name}!
          </Heading>
          <Text class="text-gray-600">
            Welcome to our platform. We're excited to have you!
          </Text>
          <Section class="text-center my-8">
            <Button
              class="bg-blue-600 text-white px-6 py-3 rounded-md"
              href="https://example.com/get-started"
            >
              Get Started
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

// Render to HTML string
const html = await render(() => <WelcomeEmail name="John" />);
```

## Rendering Options

```tsx
import { render } from 'solidjs-email';

// Basic render
const html = await render(() => <MyEmail />);

// Pretty print HTML
const prettyHtml = await render(() => <MyEmail />, { pretty: true });

// Render to plain text
const plainText = await render(() => <MyEmail />, { plainText: true });

// With Tailwind configuration
const htmlWithTailwind = await render(() => <MyEmail />, {
  tailwind: {
    config: { theme: { extend: {} } },
  },
});
```

## Sending Emails

### With Resend

```tsx
import { Resend } from 'resend';
import { render } from 'solidjs-email';
import { WelcomeEmail } from './emails/welcome';

const resend = new Resend('re_123456789');

const html = await render(() => <WelcomeEmail name="John" />);

await resend.emails.send({
  from: 'hello@example.com',
  to: 'john@example.com',
  subject: 'Welcome!',
  html,
});
```

### With Nodemailer

```tsx
import nodemailer from 'nodemailer';
import { render } from 'solidjs-email';
import { WelcomeEmail } from './emails/welcome';

const transporter = nodemailer.createTransport({ /* config */ });

const html = await render(() => <WelcomeEmail name="John" />);

await transporter.sendMail({
  from: 'hello@example.com',
  to: 'john@example.com',
  subject: 'Welcome!',
  html,
});
```

## Components

| Component | Description | Package |
|-----------|-------------|---------|
| [`Html`](./packages/html) | Root HTML wrapper | `@solidjs-email/html` |
| [`Head`](./packages/head) | Email head with meta tags | `@solidjs-email/head` |
| [`Body`](./packages/body) | Body with table layout | `@solidjs-email/body` |
| [`Container`](./packages/container) | Centered container | `@solidjs-email/container` |
| [`Section`](./packages/section) | Table section wrapper | `@solidjs-email/section` |
| [`Row`](./packages/row) | Table row | `@solidjs-email/row` |
| [`Column`](./packages/column) | Table column | `@solidjs-email/column` |
| [`Button`](./packages/button) | CTA button link | `@solidjs-email/button` |
| [`Text`](./packages/text) | Paragraph text | `@solidjs-email/text` |
| [`Heading`](./packages/heading) | h1-h6 headings | `@solidjs-email/heading` |
| [`Link`](./packages/link) | Anchor link | `@solidjs-email/link` |
| [`Img`](./packages/img) | Image | `@solidjs-email/img` |
| [`Hr`](./packages/hr) | Horizontal rule | `@solidjs-email/hr` |
| [`Preview`](./packages/preview) | Preview text (hidden) | `@solidjs-email/preview` |
| [`Font`](./packages/font) | Custom web fonts | `@solidjs-email/font` |
| [`Markdown`](./packages/markdown) | Markdown to HTML | `@solidjs-email/markdown` |
| [`CodeBlock`](./packages/code-block) | Syntax highlighted code | `@solidjs-email/code-block` |
| [`CodeInline`](./packages/code-inline) | Inline code snippet | `@solidjs-email/code-inline` |
| [`Tailwind`](./packages/tailwind) | Tailwind CSS support | `@solidjs-email/tailwind` |

### Utility Packages

| Package | Description |
|---------|-------------|
| [`render`](./packages/render) | HTML rendering utilities |
| [`solidjs-email`](./packages/solidjs-email) | Main package (all components + render) |
| [`components`](./packages/components) | All components bundle |

## Tailwind CSS Support

The `Tailwind` component automatically converts Tailwind classes to inline styles for email compatibility:

```tsx
import { Tailwind, Text } from 'solidjs-email';

<Tailwind>
  <Text class="text-lg font-bold text-blue-600">
    Styled with Tailwind!
  </Text>
</Tailwind>
```

## Custom Fonts

```tsx
import { Font, Head, Html } from 'solidjs-email';

<Html>
  <Head>
    <Font
      fontFamily="Roboto"
      fallbackFontFamily="Arial"
      webFont={{
        url: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf',
        format: 'truetype',
      }}
    />
  </Head>
  {/* ... */}
</Html>
```

## Markdown Support

```tsx
import { Markdown } from 'solidjs-email';

<Markdown>
  # Hello World

  This is **bold** and this is *italic*.

  - List item 1
  - List item 2
</Markdown>
```

## Code Blocks

```tsx
import { CodeBlock, CodeInline } from 'solidjs-email';

// Syntax highlighted code block
<CodeBlock language="typescript" theme="dracula">
  {`const greeting = "Hello, World!";
console.log(greeting);`}
</CodeBlock>

// Inline code
<Text>
  Use <CodeInline>npm install solidjs-email</CodeInline> to install.
</Text>
```

## TypeScript

All packages include TypeScript definitions:

```tsx
import type { 
  ButtonProps, 
  TextProps,
  ContainerProps 
} from 'solidjs-email';
```

## Why SolidJS?

- Fine-grained reactivity (not that it matters for static email rendering)
- Smaller bundle size
- No virtual DOM overhead
- Because we can

## License

MIT

<div align="center"><strong>SolidJS Email</strong></div>
<div align="center">Build emails with SolidJS components.<br />A port of react-email for the SolidJS ecosystem.</div>
<br />
<div align="center">
<a href="https://www.npmjs.com/package/@monkedevlife/solidjs-email-components">
  <img src="https://img.shields.io/npm/v/@monkedevlife/solidjs-email-components.svg" alt="npm version" />
</a>
<a href="https://github.com/monkedevlife/solidjs-email/blob/main/LICENSE">
  <img src="https://img.shields.io/npm/l/@monkedevlife/solidjs-email-components.svg" alt="license" />
</a>
</div>

> **Note:** This project is vibecoded. Expect rough edges, missing features, and
> the occasional existential crisis in the codebase.

## Introduction

A collection of unstyled components for creating emails using SolidJS and TypeScript. Inspired by [react-email](https://react.email), but for SolidJS.

Build responsive emails with Tailwind CSS support without fighting email client inconsistencies.

## Installation

```bash
# Install all components (recommended)
npm install @monkedevlife/solidjs-email-components

# Or with pnpm
pnpm add @monkedevlife/solidjs-email-components

# Or with yarn
yarn add @monkedevlife/solidjs-email-components
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
  Section,
  Tailwind,
  Text,
} from '@monkedevlife/solidjs-email-components';
import { render } from '@monkedevlife/solidjs-email-components';

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
import { render } from '@monkedevlife/solidjs-email-components';

// Basic render
const html = await render(() => <MyEmail />);

// Pretty print HTML
const prettyHtml = await render(() => <MyEmail />, { pretty: true });

// Render to plain text
const plainText = await render(() => <MyEmail />, { plainText: true });
```

## Sending Emails

### With Resend

```tsx
import { Resend } from 'resend';
import { render } from '@monkedevlife/solidjs-email-components';
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
import { render } from '@monkedevlife/solidjs-email-components';
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

| Component | Description | NPM |
|-----------|-------------|-----|
| [`Html`](./packages/html) | Root HTML wrapper | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-html.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-html) |
| [`Head`](./packages/head) | Email head with meta tags | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-head.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-head) |
| [`Body`](./packages/body) | Body with table layout | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-body.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-body) |
| [`Container`](./packages/container) | Centered container | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-container.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-container) |
| [`Section`](./packages/section) | Table section wrapper | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-section.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-section) |
| [`Row`](./packages/row) | Table row | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-row.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-row) |
| [`Column`](./packages/column) | Table column | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-column.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-column) |
| [`Button`](./packages/button) | CTA button link | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-button.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-button) |
| [`Text`](./packages/text) | Paragraph text | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-text.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-text) |
| [`Heading`](./packages/heading) | h1-h6 headings | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-heading.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-heading) |
| [`Link`](./packages/link) | Anchor link | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-link.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-link) |
| [`Img`](./packages/img) | Image | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-img.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-img) |
| [`Hr`](./packages/hr) | Horizontal rule | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-hr.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-hr) |
| [`Preview`](./packages/preview) | Preview text (hidden) | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-preview.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-preview) |
| [`Font`](./packages/font) | Custom web fonts | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-font.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-font) |
| [`Markdown`](./packages/markdown) | Markdown to HTML | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-markdown.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-markdown) |
| [`Tailwind`](./packages/tailwind) | Tailwind CSS support | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-tailwind.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-tailwind) |

### Utility Packages

| Package | Description | NPM |
|---------|-------------|-----|
| [`render`](./packages/render) | HTML rendering utilities | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-render.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-render) |
| [`components`](./packages/components) | All components bundle | [![npm](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-components.svg?label=)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-components) |

## Tailwind CSS Support

The `Tailwind` component automatically converts Tailwind classes to inline styles for email compatibility:

```tsx
import { Tailwind, Text } from '@monkedevlife/solidjs-email-components';

<Tailwind>
  <Text class="text-lg font-bold text-blue-600">
    Styled with Tailwind!
  </Text>
</Tailwind>
```

## Custom Fonts

```tsx
import { Font, Head, Html } from '@monkedevlife/solidjs-email-components';

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
import { Markdown } from '@monkedevlife/solidjs-email-components';

<Markdown>
  # Hello World

  This is **bold** and this is *italic*.

  - List item 1
  - List item 2
</Markdown>
```

## TypeScript

All packages include TypeScript definitions:

```tsx
import type { 
  ButtonProps, 
  TextProps,
  ContainerProps 
} from '@monkedevlife/solidjs-email-components';
```

## Why SolidJS?

- Fine-grained reactivity (not that it matters for static email rendering)
- Smaller bundle size
- No virtual DOM overhead
- Because we can

## License

MIT

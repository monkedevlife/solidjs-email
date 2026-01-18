# @monkedevlife/solidjs-email-markdown

[![npm version](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-markdown.svg)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-markdown)

Markdown to email-safe HTML for SolidJS emails.

## Installation

```bash
npm install @monkedevlife/solidjs-email-markdown
```

## Usage

```tsx
import { Markdown } from '@monkedevlife/solidjs-email-markdown';

<Markdown>
  # Hello World

  This is **bold** and this is *italic*.

  - List item 1
  - List item 2

  [Click here](https://example.com)
</Markdown>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `string` | Markdown content |
| `markdownContainerStyles` | `object` | Container styles |
| `markdownCustomStyles` | `object` | Custom styles per element |

## Custom Styles

```tsx
<Markdown
  markdownCustomStyles={{
    h1: { color: 'red', fontSize: '2rem' },
    p: { lineHeight: '1.6' },
    a: { color: 'blue' },
  }}
>
  # Custom Styled Heading
</Markdown>
```

## License

MIT

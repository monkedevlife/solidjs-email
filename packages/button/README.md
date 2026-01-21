# @solidjs-email/button

[![npm version](https://img.shields.io/npm/v/@solidjs-email/button.svg)](https://www.npmjs.com/package/@solidjs-email/button)

A button component for SolidJS emails with Outlook compatibility.

## Installation

```bash
npm install @solidjs-email/button
```

## Usage

```tsx
import { Button } from '@solidjs-email/button';

<Button href="https://example.com" style={{ background: '#007bff', color: '#fff' }}>
  Click Me
</Button>
```

## Props

All standard anchor (`<a>`) attributes plus:

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | Link URL |
| `target` | `string` | Link target (default: `_blank`) |
| `style` | `object` | Inline styles |

## License

MIT

# @solidjs-email/render

[![npm version](https://img.shields.io/npm/v/@solidjs-email/render.svg)](https://www.npmjs.com/package/@solidjs-email/render)

Transform SolidJS components into HTML email templates.

## Installation

```bash
npm install @solidjs-email/render
```

## Usage

```tsx
import { render } from '@solidjs-email/render';

const Email = () => <div>Hello World</div>;

// Basic render
const html = await render(() => <Email />);

// Pretty print
const prettyHtml = await render(() => <Email />, { pretty: true });

// Plain text
const plainText = await render(() => <Email />, { plainText: true });
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `pretty` | `boolean` | Format HTML output |
| `plainText` | `boolean` | Convert to plain text |
| `htmlToTextOptions` | `object` | Options for html-to-text |

## License

MIT

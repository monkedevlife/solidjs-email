# @solidjs-email/font

[![npm version](https://img.shields.io/npm/v/@solidjs-email/font.svg)](https://www.npmjs.com/package/@solidjs-email/font)

Custom web font support for SolidJS emails.

## Installation

```bash
npm install @solidjs-email/font
```

## Usage

```tsx
import { Font } from '@solidjs-email/font';
import { Head, Html } from '@solidjs-email/components';

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

## Props

| Prop | Type | Description |
|------|------|-------------|
| `fontFamily` | `string` | Font family name |
| `fallbackFontFamily` | `string \| string[]` | Fallback font(s) |
| `webFont` | `{ url: string, format: string }` | Web font source |
| `fontStyle` | `string` | Font style (default: `normal`) |
| `fontWeight` | `number` | Font weight (default: `400`) |

## License

MIT

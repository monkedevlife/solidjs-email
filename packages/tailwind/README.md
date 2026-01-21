# @solidjs-email/tailwind

[![npm version](https://img.shields.io/npm/v/@solidjs-email/tailwind.svg)](https://www.npmjs.com/package/@solidjs-email/tailwind)

Tailwind CSS support for SolidJS email components. Automatically converts Tailwind classes to inline styles for email compatibility.

## Installation

```bash
npm install @solidjs-email/tailwind
```

## Usage

```tsx
import { Tailwind } from '@solidjs-email/tailwind';
import { Body, Text } from '@solidjs-email/components';

const Email = () => (
  <Tailwind>
    <Body class="bg-white font-sans">
      <Text class="text-lg font-bold text-blue-600">
        Styled with Tailwind!
      </Text>
    </Body>
  </Tailwind>
);
```

## How It Works

1. Wrap your email content with the `<Tailwind>` component
2. Use Tailwind classes in the `class` attribute
3. During rendering, classes are converted to inline styles
4. Non-inlinable styles (media queries) are added to a `<style>` tag

## License

MIT

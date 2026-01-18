# @monkedevlife/solidjs-email-tailwind

[![npm version](https://img.shields.io/npm/v/@monkedevlife/solidjs-email-tailwind.svg)](https://www.npmjs.com/package/@monkedevlife/solidjs-email-tailwind)

Tailwind CSS support for SolidJS email components. Automatically converts Tailwind classes to inline styles for email compatibility.

## Installation

```bash
npm install @monkedevlife/solidjs-email-tailwind
```

## Usage

```tsx
import { Tailwind } from '@monkedevlife/solidjs-email-tailwind';
import { Body, Text } from '@monkedevlife/solidjs-email-components';

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

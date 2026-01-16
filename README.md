<div align="center"><strong>SolidJS Email</strong></div>
<div align="center">Build emails with SolidJS components.<br />A port of react-email for the SolidJS ecosystem.</div>
<br />
<div align="center">
<a href="https://github.com/monkedevlife/solidjs-email">GitHub</a>
</div>

> **Note:** This project is vibecoded. Expect rough edges, missing features, and
> the occasional existential crisis in the codebase.

## Introduction

A collection of unstyled components for creating emails using SolidJS and TypeScript. Inspired by [react-email](https://react.email), but for SolidJS.

Build responsive emails with dark mode support without fighting email client inconsistencies.

## Install

```sh
pnpm add @solidjs-email/components
```

## Getting Started

```tsx
import { Button } from '@solidjs-email/components';
import { render } from '@solidjs-email/render';

const Email = () => (
  <Button href="https://example.com" style={{ color: '#61dafb' }}>
    Click me
  </Button>
);

const html = await render(() => <Email />);
```

## Components

Standard components for building emails without table-based layout pain:

- Body
- Button
- Column
- Container
- Head
- Heading
- Hr
- Html
- Img
- Link
- Preview
- Row
- Section
- Text

## Why SolidJS?

- Fine-grained reactivity (not that it matters for static email rendering)
- Smaller bundle size
- No virtual DOM overhead
- Because we can

## Status

This is a work in progress. Components are being ported from react-email.

## License

MIT

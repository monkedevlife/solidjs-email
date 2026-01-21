# Changelog

This project uses [changesets](https://github.com/changesets/changesets) for versioning.

See individual package changelogs for detailed changes:
- [@solidjs-email/main](./packages/solidjs-email/CHANGELOG.md)
- [@solidjs-email/render](./packages/render/CHANGELOG.md)
- [@solidjs-email/body](./packages/body/CHANGELOG.md)
- [@solidjs-email/button](./packages/button/CHANGELOG.md)
- [@solidjs-email/container](./packages/container/CHANGELOG.md)
- [@solidjs-email/tailwind](./packages/tailwind/CHANGELOG.md)
- And more in `packages/*/CHANGELOG.md`

## Quick Summary

### 1.0.2 (2026-01-21)

- **Fixed**: SolidJS SSR compilation mode - configure `rolldown-plugin-solid` with `generate: 'ssr'`

### 1.0.1 (2026-01-21)

- **Fixed**: JSX transform - all packages now use `rolldown-plugin-solid` for proper SolidJS compilation
- **Fixed**: Package exports - corrected ESM/CJS file extensions

### 1.0.0 (2026-01-21)

- Initial release with 22 packages
- Core components: Body, Button, Container, Section, Row, Column, Text, Link, Heading, Img, Hr, Preview
- Advanced components: Tailwind, Markdown, Font, CodeBlock, CodeInline
- Utilities: render, Html, Head

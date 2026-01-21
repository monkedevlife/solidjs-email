# @solidjs-email/components

## 1.0.2

### Patch Changes

- Fix SolidJS SSR compilation mode

  - Configure `rolldown-plugin-solid` with `generate: 'ssr'` and `hydratable: false`
  - Ensures components use SSR-compatible exports from `solid-js/web` (e.g., `ssr`, `ssrElement`, `escape`)
  - Fixes runtime errors when rendering emails in Node.js environments

- Updated dependencies
  - @solidjs-email/body@1.0.2
  - @solidjs-email/button@1.0.2
  - @solidjs-email/code-block@1.0.2
  - @solidjs-email/code-inline@1.0.2
  - @solidjs-email/column@1.0.2
  - @solidjs-email/container@1.0.2
  - @solidjs-email/font@1.0.2
  - @solidjs-email/head@1.0.2
  - @solidjs-email/heading@1.0.2
  - @solidjs-email/hr@1.0.2
  - @solidjs-email/html@1.0.2
  - @solidjs-email/img@1.0.2
  - @solidjs-email/link@1.0.2
  - @solidjs-email/markdown@1.0.2
  - @solidjs-email/preview@1.0.2
  - @solidjs-email/render@1.0.2
  - @solidjs-email/row@1.0.2
  - @solidjs-email/section@1.0.2
  - @solidjs-email/tailwind@1.0.2
  - @solidjs-email/text@1.0.2

# @solidjs-email/main

## 2.0.0

### Major Changes

- Release next major across all packages to align breaking changes and keep workspace versions in sync.

### Patch Changes

- Updated dependencies
  - @solidjs-email/body@2.0.0
  - @solidjs-email/button@2.0.0
  - @solidjs-email/code-block@2.0.0
  - @solidjs-email/code-inline@2.0.0
  - @solidjs-email/column@2.0.0
  - @solidjs-email/container@2.0.0
  - @solidjs-email/font@2.0.0
  - @solidjs-email/head@2.0.0
  - @solidjs-email/heading@2.0.0
  - @solidjs-email/hr@2.0.0
  - @solidjs-email/html@2.0.0
  - @solidjs-email/img@2.0.0
  - @solidjs-email/link@2.0.0
  - @solidjs-email/markdown@2.0.0
  - @solidjs-email/preview@2.0.0
  - @solidjs-email/render@2.0.0
  - @solidjs-email/row@2.0.0
  - @solidjs-email/section@2.0.0
  - @solidjs-email/tailwind@2.0.0
  - @solidjs-email/text@2.0.0

## 1.0.3

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

## 1.0.2

### Patch Changes

- Fixed SolidJS JSX transform in all component packages
  - Added `rolldown-plugin-solid` to properly compile JSX for SolidJS
  - All components now use `solid-js/web` runtime instead of incorrect `solid-js/jsx-runtime`
  - Created shared `tsdown.config.ts` at monorepo root for consistent builds

## 1.0.1

### Patch Changes

- Fixed package.json exports to match actual build output
  - Changed ESM imports from `.mjs` to `.js`
  - Changed CommonJS requires from `.js` to `.cjs`
  - Updated type declaration paths for CommonJS (`.d.cts`)

## 1.0.0

- Initial release

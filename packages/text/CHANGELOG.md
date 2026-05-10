# @solidjs-email/text

## 2.0.0

### Major Changes

- Release next major across all packages to align breaking changes and keep workspace versions in sync.

## 1.0.2

### Patch Changes

- Fix SolidJS SSR compilation mode
  - Configure `rolldown-plugin-solid` with `generate: 'ssr'` and `hydratable: false`
  - Ensures components use SSR-compatible exports from `solid-js/web` (e.g., `ssr`, `ssrElement`, `escape`)
  - Fixes runtime errors when rendering emails in Node.js environments

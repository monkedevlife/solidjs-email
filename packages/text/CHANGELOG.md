# @solidjs-email/text

## 1.0.2

### Patch Changes

- Fix SolidJS SSR compilation mode

  - Configure `rolldown-plugin-solid` with `generate: 'ssr'` and `hydratable: false`
  - Ensures components use SSR-compatible exports from `solid-js/web` (e.g., `ssr`, `ssrElement`, `escape`)
  - Fixes runtime errors when rendering emails in Node.js environments

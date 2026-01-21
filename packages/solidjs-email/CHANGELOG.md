# @solidjs-email/main

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

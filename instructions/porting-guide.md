# Porting from react-email

The `.tmp/react-email/` directory contains the reference implementation.
Use it for guidance but DO NOT MODIFY those files.

## Porting Checklist

When porting a component from react-email:

1. Create the package directory structure:
   ```
   packages/<component>/
   ├── src/
   │   ├── index.ts
   │   ├── <component>.tsx
   │   └── <component>.spec.tsx
   ├── package.json
   └── tsconfig.json
   ```

2. Replace React patterns with SolidJS equivalents:
   - `React.forwardRef` → direct component function
   - `React.ComponentPropsWithoutRef<'tag'>` → `JSX.HTMLAttributes<HTMLElement>`
   - `useState` → `createSignal`
   - `useEffect` → `createEffect`
   - `useMemo` → `createMemo`
   - `{...props}` → use `splitProps` and spread `others`

3. Update imports:
   ```typescript
   // React
   import * as React from 'react';
   
   // SolidJS
   import type { Component, JSX } from 'solid-js';
   import { splitProps, mergeProps } from 'solid-js';
   ```

4. Write tests using `@solidjs-email/render`

## Package Naming

- Package name: `@solidjs-email/<component>`
- Example: `@solidjs-email/button`, `@solidjs-email/container`

## Reference Files

For each component, find the reference in:
```
.tmp/react-email/packages/<component>/src/<component>.tsx
```

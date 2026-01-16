# Code Style

## Formatting

- **Indent:** 2 spaces
- **Line width:** 80 characters
- **Quotes:** Single quotes
- **Semicolons:** Required
- **Trailing commas:** Required in multiline

## Imports

```typescript
// 1. External packages (sorted alphabetically)
import { createSignal, type Component } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

// 2. Internal modules (relative imports)
import { parseStyles } from './utils/parse-styles';
```

- Use `import type { ... }` for type-only imports
- Sort imports alphabetically within each group

## Naming Conventions

| Category         | Convention        | Example                          |
| ---------------- | ----------------- | -------------------------------- |
| Files            | kebab-case        | `parse-padding.ts`               |
| Components       | PascalCase        | `Button`, `Container`            |
| Component files  | kebab-case        | `button.tsx`                     |
| Functions        | camelCase         | `parsePadding`                   |
| Variables        | camelCase         | `paddingTop`                     |
| Types/Interfaces | PascalCase        | `ButtonProps`                    |
| Constants        | camelCase         | `defaultStyles`                  |
| Test files       | `<name>.spec.tsx` | `button.spec.tsx`                |

## Exports

```typescript
// Barrel exports (index.ts)
export * from './button';
export type { ButtonProps } from './button';

// Named exports in component files
export type ButtonProps = Readonly<...>;
export const Button: Component<ButtonProps> = ...;
```

## Error Handling

```typescript
// Throw descriptive errors
if (!isValid) {
  throw new Error(`Invalid configuration: ${details}`);
}

// Graceful fallbacks
export function convertToPx(value: string | number): number {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  return 0;
}
```

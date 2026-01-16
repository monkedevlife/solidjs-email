# Agent Guidelines for solidjs-email

This is a SolidJS email library, inspired by [react.email](https://react.email/docs/introduction).
It uses SolidJS for components instead of React.

## Project Overview

- **Package Manager:** pnpm 10.24.0
- **Reference Implementation:** `.tmp/react-email/` (cloned react-email for guidance)
- **License:** MIT

## Commands

### Build

```bash
# Build all packages (once monorepo is set up)
pnpm build

# Build a single package
pnpm --filter @solidjs-email/<package> build

# Build with watch mode
pnpm --filter @solidjs-email/<package> build:watch
```

### Lint & Format

```bash
# Check linting
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

### Test

```bash
# Run all tests
pnpm test

# Run tests for a single package
pnpm --filter @solidjs-email/<package> test

# Run a single test file
pnpm vitest run path/to/file.spec.tsx

# Run tests matching a pattern
pnpm vitest run -t "test name pattern"

# Watch mode
pnpm vitest path/to/file.spec.tsx
```

## Project Structure

```
solidjs-email/
├── packages/
│   ├── body/                 # <Body> component
│   ├── button/               # <Button> component
│   ├── container/            # <Container> component
│   ├── components/           # Re-exports all components
│   ├── render/               # HTML rendering utilities
│   └── ...                   # Other email components
├── .tmp/
│   └── react-email/          # Reference implementation (DO NOT MODIFY)
├── package.json
└── AGENTS.md
```

### Package Internal Structure

```
packages/<component>/
├── src/
│   ├── index.ts              # Re-exports main component
│   ├── <component>.tsx       # Main component implementation
│   └── <component>.spec.tsx  # Tests
├── package.json
├── tsconfig.json
└── readme.md
```

## Code Style Guidelines

### General Principles

- Be concise in all code and comments
- Do not write code comments unless explicitly instructed
- Follow existing file structure and naming conventions
- Prefer editing existing files over creating new ones
- Use absolute paths for all file operations

### Imports

```typescript
// 1. External packages first (sorted alphabetically)
import { createSignal, type Component } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

// 2. Internal modules (relative imports)
import { useEmailContext } from './context';
import { parseStyles } from './utils/parse-styles';
```

- Use `import type { ... }` for type-only imports
- Prefer namespace imports for core libraries: `import * as solid from 'solid-js'`
- Sort imports alphabetically within each group

### Naming Conventions

| Category         | Convention        | Example                          |
| ---------------- | ----------------- | -------------------------------- |
| Files            | kebab-case        | `parse-padding.ts`, `px-to-pt.ts`|
| Components       | PascalCase        | `Button`, `Container`, `Section` |
| Component files  | kebab-case        | `button.tsx`, `container.tsx`    |
| Functions        | camelCase         | `parsePadding`, `convertToPx`    |
| Variables        | camelCase         | `paddingTop`, `styleSheet`       |
| Types/Interfaces | PascalCase        | `ButtonProps`, `ContainerProps`  |
| Constants        | camelCase         | `defaultStyles`, `maxWidth`      |
| Test files       | `<name>.spec.tsx` | `button.spec.tsx`                |

### Formatting

- **Indent:** 2 spaces
- **Line width:** 80 characters
- **Quotes:** Single quotes
- **Semicolons:** Required
- **Trailing commas:** Required in multiline

### Types

```typescript
// Props type pattern - use Readonly wrapper
export type ButtonProps = Readonly<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>;
export type BodyProps = Readonly<JSX.HTMLAttributes<HTMLBodyElement>>;

// Combined props with intersection types
export type HeadingProps = HeadingAs & Margin;

// Prefer explicit return types for public functions
export function parseValue(input: string): number {
  // ...
}
```

### Component Implementation Pattern (SolidJS)

```typescript
import type { Component, JSX } from 'solid-js';
import { splitProps, mergeProps } from 'solid-js';

export type ButtonProps = Readonly<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
    // Custom props here
  }
>;

export const Button: Component<ButtonProps> = (props) => {
  const merged = mergeProps({ target: '_blank' }, props);
  const [local, others] = splitProps(merged, ['children', 'style']);

  return (
    <a
      {...others}
      style={{
        display: 'inline-block',
        // Default styles...
        ...local.style,
      }}
    >
      {local.children}
    </a>
  );
};
```

### Error Handling

```typescript
// Throw descriptive errors with actionable messages
if (!isValid) {
  throw new Error(
    `Invalid configuration: ${details}.
Please check the documentation at https://github.com/...`
  );
}

// Use graceful fallbacks where appropriate
export function convertToPx(value: string | number): number {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  // Parse string...
  return 0; // Default fallback
}
```

### Exports

```typescript
// Barrel exports (index.ts)
export * from './button';
export type { ButtonProps } from './button';

// Named exports in component files
export type ButtonProps = Readonly<...>;
export const Button: Component<ButtonProps> = ...;
```

## Testing Guidelines

### Test File Structure

```typescript
import { render } from '@solidjs-email/render';
import { Button } from './index';

describe('<Button> component', () => {
  it('renders children correctly', async () => {
    const html = await render(() => <Button>Test</Button>);
    expect(html).toContain('Test');
  });

  it('applies custom styles', async () => {
    const html = await render(() => (
      <Button style={{ 'background-color': 'red' }}>Test</Button>
    ));
    expect(html).toContain('background-color:red');
  });

  it('matches snapshot', async () => {
    const html = await render(() => <Button href="https://example.com" />);
    expect(html).toMatchInlineSnapshot();
  });
});
```

### Testing Best Practices

- Place test files alongside source files: `button.spec.tsx` next to `button.tsx`
- Use descriptive test names that explain the expected behavior
- Group related tests with `describe()` blocks
- Prefer `toMatchInlineSnapshot()` for rendered HTML
- All render tests should be async

## Git Guidelines

- NEVER update git config
- NEVER run destructive git commands (push --force, hard reset) unless explicitly requested
- NEVER skip hooks (--no-verify) unless explicitly requested
- Focus commit messages on "why" rather than "what"
- NEVER include AI attribution in commits

## Search Guidelines

- Use ripgrep (rg) for code searches: `rg "pattern" path --type ts`
- Prefer rg over grep for faster, more accurate searches
- Use proper regex escaping: `rg "window\.location"` not `rg "window.location"`

## Reference Implementation

The `.tmp/react-email/` directory contains the original react-email library for reference.
Use this to understand patterns and port components to SolidJS, but DO NOT MODIFY these files.

Key differences when porting from React to SolidJS:
- Replace `React.forwardRef` with direct component definitions
- Replace `useState` with `createSignal`
- Replace `useEffect` with `createEffect`
- Use `splitProps` and `mergeProps` for prop handling
- Use `JSX` types from `solid-js` instead of React types

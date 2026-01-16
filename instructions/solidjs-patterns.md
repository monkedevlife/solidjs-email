# SolidJS Patterns

When writing SolidJS components for this email library, follow these patterns.

## Component Structure

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
        ...local.style,
      }}
    >
      {local.children}
    </a>
  );
};
```

## Key Differences from React

- No `React.forwardRef` - SolidJS components receive props directly
- Use `splitProps` to separate local props from passthrough props
- Use `mergeProps` to set default prop values
- Props are reactive - do not destructure them at the top level
- Use `JSX` types from `solid-js` instead of React types

## Props Handling

```typescript
// WRONG - breaks reactivity
const Button: Component<ButtonProps> = ({ children, style, ...rest }) => {
  // ...
};

// CORRECT - preserves reactivity
const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'style']);
  // ...
};
```

## Type Patterns

```typescript
// Use Readonly wrapper for immutability
export type BodyProps = Readonly<JSX.HTMLAttributes<HTMLBodyElement>>;

// Intersection types for combined props
export type HeadingProps = HeadingAs & Margin;
```

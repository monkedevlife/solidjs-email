# Testing Guidelines

## Running Tests

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

## Test Structure

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

## Best Practices

- Place test files alongside source: `button.spec.tsx` next to `button.tsx`
- Use descriptive test names explaining expected behavior
- Group related tests with `describe()` blocks
- Prefer `toMatchInlineSnapshot()` for rendered HTML
- All render tests should be async
- Test both default behavior and custom props

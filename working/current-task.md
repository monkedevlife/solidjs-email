# Task: Create Base Email Components with Tailwind Integration

## Objective
Port essential email components and Tailwind CSS integration from react-email to SolidJS.

## Plan
1. [x] Set up pnpm workspace and monorepo structure
2. [x] Create @solidjs-email/render package
3. [x] Create @solidjs-email/html component  
4. [x] Create @solidjs-email/head component
5. [x] Create @solidjs-email/body component
6. [x] Create @solidjs-email/tailwind package
7. [x] Create @solidjs-email/components barrel package
8. [x] Add tests (28 tests passing)
9. [x] Build packages
10. [x] Port additional components:
    - [x] Button
    - [x] Container
    - [x] Section
    - [x] Row
    - [x] Column
    - [x] Text
    - [x] Link
    - [x] Heading
    - [x] Img
    - [x] Hr
    - [x] Preview
11. [x] Add tests for new components (99 tests total, all passing)
12. [x] Create example email templates (examples/emails/)
13. [x] Create dev server (@solidjs-email/dev-server)
14. [x] Add Font component (@solidjs-email/font) - 11 tests
15. [x] Add Markdown component (@solidjs-email/markdown) - 15 tests

## Context

### Tailwind Implementation Strategy
Following react-email's approach:
- Use Tailwind v4's `compile()` API to generate CSS
- Use `css-tree` for CSS AST parsing
- Separate inlinable vs non-inlinable rules
- Sanitize CSS for email compatibility

### Key SolidJS Differences from React
- No `forwardRef` - direct component functions
- Use `splitProps` and `mergeProps` for prop handling
- Use `children()` helper for child traversal

## Acceptance Criteria
- [x] All packages build successfully (20 packages + examples)
- [x] Tailwind classes get inlined as styles (tested)
- [x] Non-inlinable classes (media queries) go to `<style>` tag (tested)
- [x] Tests pass (125 tests across 18 packages)
- [x] Dev server working with hot reload

## Remaining Work
- [ ] Consider adding CodeBlock, CodeInline components
- [ ] Consider adding Table component
- [ ] Publish to npm

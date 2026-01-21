# Task: Create solidjs-email Main Package and Rename to @solidjs-email Org

## Objective
Create a main `solidjs-email` package that re-exports all components, similar to `react-email`, and rename all packages from `@monkedevlife/solidjs-email-*` to `@solidjs-email/*`.

## Plan
1. [x] Create packages/solidjs-email/ directory structure
2. [x] Create package.json for solidjs-email main package
3. [x] Create src/index.ts re-exporting all components and render
4. [x] Create src/components.ts for components-only export
5. [x] Create tsconfig.json for the package
6. [x] Update all package names from @monkedevlife/solidjs-email-* to @solidjs-email/*
7. [x] Update all imports in source files
8. [x] Update vitest.config.ts aliases
9. [x] Update example projects
10. [x] Verify build passes
11. [x] Verify tests pass
12. [x] Add README for solidjs-email package

## Completed Work

### New Package Structure
```
packages/solidjs-email/
├── src/
│   ├── index.ts       # Re-exports everything (components + render)
│   └── components.ts  # Re-exports components only
├── package.json
├── tsconfig.json
└── README.md
```

### Package Naming Convention
- Main package: `solidjs-email` (unprefixed for easy installation)
- Individual packages: `@solidjs-email/<component>`
- Repository: `https://github.com/solidjs-email/solidjs-email.git`

### Files Updated
- All 22 packages' package.json files
- All source files with @monkedevlife imports
- vitest.config.ts
- examples/default/package.json
- examples/tailwindv4/package.json
- Various vite.config.ts files
- Various README.md files

## Acceptance Criteria
- [x] Main solidjs-email package exists and builds
- [x] All packages renamed to @solidjs-email/* scope
- [x] All imports updated
- [x] All tests pass (141 tests)
- [x] All packages build successfully

## Next Steps
- Set up @solidjs-email npm organization
- Publish packages to npm
- Update project README with new package names

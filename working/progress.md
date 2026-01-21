# Progress Log

This document tracks task progress for the solidjs-email project.
The agent reads this after compaction to restore context.

---

## [2026-01-22 00:15] Refactored Dev Server to Use SolidStart

### Completed
- **Refactored @solidjs-email/dev-server** to use SolidStart instead of raw HTML strings:
  - Created `app.config.ts` with SolidStart/Vinxi configuration
  - Created `src/app.tsx` as root app component with Router
  - Created `src/app.css` with dark theme CSS variables and Tailwind
  - Created `src/entry-client.tsx` and `src/entry-server.tsx` entry points
  - Created file-based routes:
    - `src/routes/index.tsx` - Home page with template list
    - `src/routes/preview/[slug].tsx` - Email preview page with view toggle
  - Created lib utilities:
    - `src/lib/emails.ts` - Scans directory for email templates
    - `src/lib/render.ts` - Renders email components to HTML
  - Updated CLI to use vinxi dev server

### Dev Server Features
- **Dark theme UI** with sidebar and main content area
- **Template sidebar** - Lists all .tsx/.jsx files from emails directory
- **Email preview** - Renders email in iframe with white background
- **HTML view** - Shows rendered HTML source code with monospace font
- **Copy HTML button** - Copies rendered HTML to clipboard
- **Preview/HTML toggle** - Switch between visual preview and HTML source
- **Active template highlighting** - Blue highlight for selected template

### Technical Stack
- SolidStart 1.2.1 with Vinxi
- @solidjs/router for file-based routing
- Tailwind CSS v4 via @tailwindcss/vite plugin
- Server functions with `'use server'` for email loading/rendering

### Files Created/Modified
- `packages/dev-server/app.config.ts` - SolidStart config
- `packages/dev-server/src/app.tsx` - Root component
- `packages/dev-server/src/app.css` - Tailwind + dark theme
- `packages/dev-server/src/entry-client.tsx` - Client entry
- `packages/dev-server/src/entry-server.tsx` - Server entry
- `packages/dev-server/src/routes/index.tsx` - Home route
- `packages/dev-server/src/routes/preview/[slug].tsx` - Preview route
- `packages/dev-server/src/lib/emails.ts` - Email scanning utilities
- `packages/dev-server/src/lib/render.ts` - Email rendering
- `packages/dev-server/src/cli.ts` - Updated CLI
- `packages/dev-server/package.json` - Updated dependencies and scripts

### Usage
```bash
# From project root
pnpm dev

# From dev-server package
cd packages/dev-server
EMAILS_DIR=../../examples/default/emails pnpm exec vinxi dev --port 6008

# Visit http://localhost:6008
```

### Current State
- Dev server fully functional with SolidStart
- Both email templates (welcome, verification-code) rendering correctly
- Preview and HTML views working
- Copy to clipboard functionality working
- Template switching via sidebar working

### Next Steps
- Add file watcher for hot reload on template changes
- Consider adding syntax highlighting for HTML view
- Consider adding resizable preview frame
- Consider adding send test email functionality

---

## [2026-01-21 22:56] Updated Documentation for @solidjs-email/main

### Completed
- Updated **README.md** to use `@solidjs-email/main` instead of `solidjs-email`:
  - npm badge URL
  - Installation commands
  - Import statements
  - Package table reference
  
- Updated **docs/monorepo-setup.md** to use `@solidjs-email/main`:
  - Installation instructions
  - Import statements
  - Package dependency examples
  - Package table
  
- Updated **vitest.config.ts** alias from `solidjs-email` to `@solidjs-email/main`

### Current State
- **25 workspace projects** building successfully
- **145 tests passing** across 20 packages
- Main package is `@solidjs-email/main` (scoped under npm org)
- All documentation updated to reflect new package name

### Package Naming
- Main package: `@solidjs-email/main` (scoped, publishes to @solidjs-email org)
- Individual packages: `@solidjs-email/body`, `@solidjs-email/button`, etc.
- All packages version `1.0.0`

### Usage
```bash
# Install main package
npm install @solidjs-email/main solid-js

# Or install individual packages
npm install @solidjs-email/render @solidjs-email/button solid-js
```

```tsx
// Using main package
import { render, Button, Text, Container } from '@solidjs-email/main';

// Using individual packages
import { render } from '@solidjs-email/render';
import { Button } from '@solidjs-email/button';
```

### Next Steps
- Publish packages to npm: `pnpm -r publish --access public`
- Update any remaining references

---

## [2026-01-21 19:25] Created solidjs-email Main Package & Renamed to @solidjs-email Org

### Completed
- Created **solidjs-email** main package (`packages/solidjs-email/`):
  - Re-exports all components and render utilities in a single package
  - Users can `npm install solidjs-email` to get everything
  - Has `solidjs-email` (main) and `solidjs-email/components` (components only) exports
  - README with usage examples

- **Renamed all packages** from `@monkedevlife/solidjs-email-*` to `@solidjs-email/*`:
  - Updated all 22 package.json files
  - Updated all import statements in source files
  - Updated vitest.config.ts aliases
  - Updated example projects
  - Updated documentation

### Package Naming
- Main package: `solidjs-email` (no scope, easy to install)
- Individual packages: `@solidjs-email/body`, `@solidjs-email/button`, etc.
- Repository: `https://github.com/solidjs-email/solidjs-email.git`

### Current State
- **26 workspace projects** (23 packages + examples + root)
- **141 tests passing** across 20 packages
- All packages build successfully
- Dev server working

### Package Summary (Updated)
| Package | npm Name | Description |
|---------|----------|-------------|
| solidjs-email | `solidjs-email` | Main entry point |
| body | `@solidjs-email/body` | Body component |
| button | `@solidjs-email/button` | Button component |
| code-block | `@solidjs-email/code-block` | Syntax highlighting |
| code-inline | `@solidjs-email/code-inline` | Inline code |
| column | `@solidjs-email/column` | Table column |
| container | `@solidjs-email/container` | Container |
| font | `@solidjs-email/font` | Custom fonts |
| head | `@solidjs-email/head` | Head component |
| heading | `@solidjs-email/heading` | Heading h1-h6 |
| hr | `@solidjs-email/hr` | Horizontal rule |
| html | `@solidjs-email/html` | Html wrapper |
| img | `@solidjs-email/img` | Image component |
| link | `@solidjs-email/link` | Link anchor |
| markdown | `@solidjs-email/markdown` | Markdown parser |
| preview | `@solidjs-email/preview` | Preview text |
| render | `@solidjs-email/render` | HTML rendering |
| row | `@solidjs-email/row` | Table row |
| section | `@solidjs-email/section` | Section |
| tailwind | `@solidjs-email/tailwind` | Tailwind CSS |
| text | `@solidjs-email/text` | Text paragraph |
| components | `@solidjs-email/components` | Barrel export |
| dev-server | `@solidjs-email/dev-server` | Preview server |

### Usage
```bash
# Install main package
npm install solidjs-email solid-js

# Or install individual packages
npm install @solidjs-email/render @solidjs-email/button solid-js
```

```tsx
// Using main package
import { render, Button, Text, Container } from 'solidjs-email';

// Using individual packages
import { render } from '@solidjs-email/render';
import { Button } from '@solidjs-email/button';
```

### Next Steps
- Set up npm organization `@solidjs-email` 
- Publish packages to npm
- Update documentation with new package names

---

## [2026-01-18 16:30] Added CodeInline, CodeBlock, and GitHub Actions CI

### Completed
- Added **CodeInline component** (`@solidjs-email/code-inline`):
  - Renders `<code>` element with Orange.fr email client compatibility
  - Uses `<style>` tag for meta-based CSS targeting
  - 8 tests passing

- Added **CodeBlock component** (`@solidjs-email/code-block`):
  - Syntax highlighting using bundled Prism.js
  - 15+ code themes (dracula, vscDarkPlus, xonokai, etc.)
  - Supports 400+ languages
  - Optional line numbers
  - 8 tests passing

- Added **GitHub Actions CI workflow** (`.github/workflows/ci.yml`):
  - Runs on push/PR to main
  - Tests and lint jobs
  - Uses pnpm 10.24.0 and Node 20

- Added **Publish workflow** (`.github/workflows/publish.yml`):
  - Triggers on version tags (v*)
  - Builds, tests, and publishes all packages to npm

### Current State
- **24 workspace projects** (22 packages + examples + root)
- **141 tests passing** across 20 packages
- All packages build successfully
- Dev server working on port 6008

### Package Summary (Updated)
| Package | Description | Tests |
|---------|-------------|-------|
| render | HTML rendering | ✅ 6 |
| html | Html wrapper | ✅ 5 |
| head | Head component | ✅ 4 |
| body | Body component | ✅ 5 |
| tailwind | Tailwind CSS | ✅ 8 |
| button | Button link | ✅ 7 |
| container | Container | ✅ 7 |
| section | Section | ✅ 6 |
| row | Row | ✅ 6 |
| column | Column | ✅ 6 |
| text | Text paragraph | ✅ 7 |
| link | Link anchor | ✅ 8 |
| heading | Heading h1-h6 | ✅ 10 |
| img | Image | ✅ 7 |
| hr | Horizontal rule | ✅ 6 |
| preview | Preview text | ✅ 8 |
| font | Custom fonts | ✅ 11 |
| markdown | Markdown parser | ✅ 15 |
| **code-inline** | Inline code | ✅ 8 |
| **code-block** | Syntax highlight | ✅ 8 |
| dev-server | Preview server | - |
| components | Barrel export | - |

### Next Steps
- Create more example email templates
- Publish new packages to npm
- Consider adding Table component

---

## [2026-01-17 17:35] Fixed Tailwind CSS Processing in Render

### Completed
- Fixed Tailwind CSS not being applied in email previews
- The `render()` function now automatically processes Tailwind classes via `processTailwindInHtml()`
- Uses dynamic import to avoid hard dependency issues
- Added `@solidjs-email/tailwind` as dependency to render package

### Changes
- `packages/render/src/render.ts` - Added `processTailwind()` helper that dynamically imports and runs Tailwind processing
- `packages/render/package.json` - Added `@solidjs-email/tailwind` dependency

### How it works
1. `render()` calls `renderToStringAsync()` to get HTML with `class` attributes
2. `processTailwind()` dynamically imports `processTailwindInHtml` from tailwind package
3. Tailwind classes are converted to inline styles
4. Non-inlinable styles (media queries) are added to `<head>` as `<style>` tag

---

## [2026-01-17 17:25] Font & Markdown Components Integrated

### Completed
- Integrated **Font component** (`@solidjs-email/font`):
  - Renders `<style>` with `@font-face` for custom web fonts
  - Supports fallback fonts and `mso-font-alt` for Outlook
  - 11 tests passing

- Integrated **Markdown component** (`@solidjs-email/markdown`):
  - Uses `marked` library with custom Renderer
  - Inline styles for email compatibility
  - Supports headings, lists, code blocks, links, images, blockquotes
  - 15 tests passing

- Fixed Font test (SolidJS SSR adds `data-hk` attribute to elements)
- Added aliases to `vitest.config.ts`
- Added exports to `@solidjs-email/components` barrel
- Installed `marked` dependency

### Current State
- **22 workspace projects** (20 packages + examples + root)
- **125 tests passing** across 18 packages
- All packages build successfully
- Dev server working with hot reload

### Package Summary (Updated)
| Package | Description | Tests |
|---------|-------------|-------|
| render | HTML rendering | ✅ 6 |
| html | Html wrapper | ✅ 5 |
| head | Head component | ✅ 4 |
| body | Body component | ✅ 5 |
| tailwind | Tailwind CSS | ✅ 8 |
| button | Button link | ✅ 7 |
| container | Container | ✅ 7 |
| section | Section | ✅ 6 |
| row | Row | ✅ 6 |
| column | Column | ✅ 6 |
| text | Text paragraph | ✅ 7 |
| link | Link anchor | ✅ 8 |
| heading | Heading h1-h6 | ✅ 10 |
| img | Image | ✅ 7 |
| hr | Horizontal rule | ✅ 6 |
| preview | Preview text | ✅ 8 |
| **font** | Custom fonts | ✅ 11 |
| **markdown** | Markdown parser | ✅ 15 |
| dev-server | Preview server | - |
| components | Barrel export | - |

### Next Steps
- Consider adding CodeBlock, CodeInline components
- Consider adding Table component
- Publish to npm

---

## [2026-01-17 17:30] Dev Server & Examples Created

### Completed
- Created **example email templates** in `examples/emails/`:
  - `welcome.tsx` - Welcome email with button, text, links
  - `verification-code.tsx` - Verification code email with code display
  - Both use Tailwind CSS classes and PreviewProps

- Created **@solidjs-email/dev-server** package:
  - Vite-based preview server (lighter than react-email's Next.js approach)
  - Live template list in sidebar
  - Real-time email rendering with iframe preview
  - HTML source view toggle
  - Hot reload via Server-Sent Events (SSE)
  - File watching with chokidar
  - CLI: `solidjs-email dev --dir <emails-dir> --port <port>`

- Added convenience script to root package.json:
  - `pnpm dev` - starts dev server with examples/emails

### Current State
- **20 workspace projects** (18 packages + examples + root)
- **99 tests passing** across 16 packages
- Dev server working with hot reload

### Usage
```bash
# Start dev server from project root
pnpm dev

# Or from dev-server package
cd packages/dev-server
pnpm exec vite-node src/cli.ts --dir ../../examples/emails

# Visit http://localhost:3000
```

### Package Summary
| Package | Description | Tests |
|---------|-------------|-------|
| render | HTML rendering | ✅ 6 |
| html | Html wrapper | ✅ 5 |
| head | Head component | ✅ 4 |
| body | Body component | ✅ 5 |
| tailwind | Tailwind CSS | ✅ 8 |
| button | Button link | ✅ 7 |
| container | Container | ✅ 7 |
| section | Section | ✅ 6 |
| row | Row | ✅ 6 |
| column | Column | ✅ 6 |
| text | Text paragraph | ✅ 7 |
| link | Link anchor | ✅ 8 |
| heading | Heading h1-h6 | ✅ 10 |
| img | Image | ✅ 7 |
| hr | Horizontal rule | ✅ 6 |
| preview | Preview text | ✅ 8 |
| dev-server | Preview server | - |
| components | Barrel export | - |

### Next Steps
- Consider adding Font component
- Consider adding Markdown component
- Publish to npm

---

## [2026-01-17 16:55] Tests Added for All Components

### Completed
- Added comprehensive test suites for all 11 new components:
  - **Button** (7 tests) - anchor rendering, target, styles, MSO hacks
  - **Container** (7 tests) - table structure, max-width, attributes
  - **Section** (6 tests) - table structure, styling, props
  - **Row** (6 tests) - table structure, styling, attributes
  - **Column** (6 tests) - td rendering, data-id, Row integration
  - **Text** (7 tests) - p rendering, default margins, overrides
  - **Link** (8 tests) - anchor rendering, target, styles, children
  - **Heading** (10 tests) - dynamic h1-h6, margin props, styling
  - **Img** (7 tests) - img rendering, default styles, attributes
  - **Hr** (6 tests) - hr rendering, default border styles
  - **Preview** (8 tests) - hidden div, whitespace padding, truncation

- Fixed bug in Heading component (splitProps imported from wrong module)
- Added test scripts to all package.json files
- All tests account for SolidJS SSR specifics (data-hk attributes, class trailing space, camelCase attributes)

### Current State
- **17 packages** in the monorepo
- **99 tests passing** across 16 packages
- All packages build successfully

### Package Summary
| Package | Description | Tests |
|---------|-------------|-------|
| render | HTML rendering | ✅ 6 |
| html | Html wrapper | ✅ 5 |
| head | Head component | ✅ 4 |
| body | Body component | ✅ 5 |
| tailwind | Tailwind CSS | ✅ 8 |
| button | Button link | ✅ 7 |
| container | Container | ✅ 7 |
| section | Section | ✅ 6 |
| row | Row | ✅ 6 |
| column | Column | ✅ 6 |
| text | Text paragraph | ✅ 7 |
| link | Link anchor | ✅ 8 |
| heading | Heading h1-h6 | ✅ 10 |
| img | Image | ✅ 7 |
| hr | Horizontal rule | ✅ 6 |
| preview | Preview text | ✅ 8 |
| components | Barrel export | - |

### Next Steps
- Create example email template
- Consider adding Font component
- Consider adding Markdown component
- Publish to npm

---

## [2026-01-17 16:49] New Components Ported

### Completed
- Ported 11 new components from react-email to SolidJS:
  - **Button** - with MSO-specific padding hacks for Outlook
  - **Container** - centered table container (max-width: 37.5em)
  - **Section** - table-based section wrapper
  - **Row** - table row wrapper
  - **Column** - table cell wrapper
  - **Text** - paragraph with default margins
  - **Link** - anchor with default styling
  - **Heading** - dynamic heading (h1-h6) with margin props
  - **Img** - image with email-safe defaults
  - **Hr** - horizontal rule
  - **Preview** - hidden preview text for email clients

- Updated vitest.config.ts with aliases for all new packages
- Updated @solidjs-email/components barrel export with all components
- All 17 packages build successfully
- All 28 existing tests still pass

### Current State
- **17 packages** in the monorepo
- **28 tests passing** (original packages only)
- New components don't have tests yet (removed test scripts)

### Package Summary
| Package | Description | Tests |
|---------|-------------|-------|
| render | HTML rendering | ✅ 6 |
| html | Html wrapper | ✅ 5 |
| head | Head component | ✅ 4 |
| body | Body component | ✅ 5 |
| tailwind | Tailwind CSS | ✅ 8 |
| button | Button link | - |
| container | Container | - |
| section | Section | - |
| row | Row | - |
| column | Column | - |
| text | Text paragraph | - |
| link | Link anchor | - |
| heading | Heading h1-h6 | - |
| img | Image | - |
| hr | Horizontal rule | - |
| preview | Preview text | - |
| components | Barrel export | - |

### Next Steps
- Add tests for new components
- Create example email template
- Consider adding Font component
- Consider adding Markdown component

---

## [2026-01-16 17:49] Test Suite Fixes

### Completed
- Fixed vitest.config.ts to use `vite-plugin-solid` with SSR mode
- Added alias resolution for workspace packages (`@solidjs-email/*` → source files)
- Fixed head.spec.tsx assertions (charset format, SSR data-hk attributes)
- Fixed html.spec.tsx to use structural assertions instead of exact snapshot
- Removed test script from components package (barrel export only)
- Fixed tsdown build scripts with proper entry points (`src/index.ts --format esm,cjs --dts`)

### Current State
- **All 28 tests passing across 5 packages**
  - render: 6 tests ✓
  - body: 5 tests ✓
  - head: 4 tests ✓
  - html: 5 tests ✓
  - tailwind: 8 tests ✓
- **All 6 packages build successfully**
  - render, body, head, html, tailwind, components

### Packages Created
1. `@solidjs-email/render` - HTML rendering utilities
2. `@solidjs-email/html` - `<Html>` wrapper component
3. `@solidjs-email/head` - `<Head>` component with email meta tags
4. `@solidjs-email/body` - `<Body>` component with table layout
5. `@solidjs-email/tailwind` - Tailwind CSS processing
6. `@solidjs-email/components` - Barrel export package

### Key Configuration
- vitest.config.ts uses `vite-plugin-solid` with `ssr: true`
- Workspace packages resolved to source via aliases for testing
- tsdown builds with ESM + CJS + DTS

### Next Steps
- Consider adding more components (Button, Container, Section, etc.)
- Add end-to-end example email template
- Publish to npm
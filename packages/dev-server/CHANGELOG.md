# @solidjs-email/dev-server

## 1.1.0

### Minor Changes

- 34bf235: Refactored dev-server to use SolidStart instead of raw HTML strings
  - Replaced 500+ line HTML template with proper SolidStart application
  - Added file-based routing with @solidjs/router
  - Added Tailwind CSS v4 for styling with dark theme
  - Added server functions for email loading and rendering
  - Features: template sidebar, email preview iframe, HTML source view, copy button

### Patch Changes

- 7f7cc7c: Fix dev-server to work when installed as a dependency
  - Move `@solidjs-email/components` from devDependencies to dependencies
  - This ensures all email components are available when dev-server is installed outside the monorepo
  - Remove hardcoded source file aliases when not in monorepo - let Vite resolve from node_modules

- d6509d9: Strip scripts from email preview to avoid sandbox warnings

  Email clients don't execute JavaScript, so scripts in rendered emails are stripped from previews to eliminate console warnings about blocked script execution in sandboxed iframes.

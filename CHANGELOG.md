# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-01-21

### Fixed

- **JSX Transform**: All component packages now properly use `rolldown-plugin-solid` to compile JSX for SolidJS runtime (`solid-js/web`) instead of the incorrect React-style JSX runtime (`solid-js/jsx-runtime`)
- **Build Configuration**: Created shared `tsdown.config.ts` at monorepo root with SolidJS plugin for consistent builds across all packages

### Changed

- Updated all package build scripts to use the shared tsdown configuration
- Added `"type": "module"` to root `package.json`

### Packages Updated

All packages bumped to 1.0.1:
- @solidjs-email/body
- @solidjs-email/button
- @solidjs-email/code-block
- @solidjs-email/code-inline
- @solidjs-email/column
- @solidjs-email/container
- @solidjs-email/components
- @solidjs-email/dev-server
- @solidjs-email/font
- @solidjs-email/head
- @solidjs-email/heading
- @solidjs-email/hr
- @solidjs-email/html
- @solidjs-email/img
- @solidjs-email/link
- @solidjs-email/markdown
- @solidjs-email/preview
- @solidjs-email/render
- @solidjs-email/row
- @solidjs-email/section
- @solidjs-email/tailwind
- @solidjs-email/text

@solidjs-email/main bumped to 1.0.2

## [1.0.0] - Initial Release

- Initial release of all solidjs-email packages

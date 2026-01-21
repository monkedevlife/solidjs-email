---
"@solidjs-email/dev-server": minor
---

Refactored dev-server to use SolidStart instead of raw HTML strings

- Replaced 500+ line HTML template with proper SolidStart application
- Added file-based routing with @solidjs/router
- Added Tailwind CSS v4 for styling with dark theme
- Added server functions for email loading and rendering
- Features: template sidebar, email preview iframe, HTML source view, copy button

---
"@solidjs-email/dev-server": patch
---

Fix dev-server to work when installed as a dependency

- Move `@solidjs-email/components` from devDependencies to dependencies
- This ensures all email components are available when dev-server is installed outside the monorepo
- Remove hardcoded source file aliases when not in monorepo - let Vite resolve from node_modules

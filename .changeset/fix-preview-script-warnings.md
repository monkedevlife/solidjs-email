---
"@solidjs-email/dev-server": patch
---

Strip scripts from email preview to avoid sandbox warnings

Email clients don't execute JavaScript, so scripts in rendered emails are stripped from previews to eliminate console warnings about blocked script execution in sandboxed iframes.

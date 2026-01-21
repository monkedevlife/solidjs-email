# Task: Refactor Dev Server to Use SolidStart

## Status: COMPLETED ✅

## Objective
Refactor the @solidjs-email/dev-server package to use SolidStart instead of raw HTML strings for the preview UI.

## Completed Steps

1. ✅ Created SolidStart app structure
   - `app.config.ts` - Vinxi/SolidStart configuration
   - `src/entry-client.tsx` - Client entry point
   - `src/entry-server.tsx` - Server entry point with document template
   
2. ✅ Created app.tsx and Tailwind CSS setup
   - `src/app.tsx` - Root component with Router and Suspense
   - `src/app.css` - Dark theme CSS variables + Tailwind imports

3. ✅ Created routes
   - `src/routes/index.tsx` - Home page with welcome message and template list
   - `src/routes/preview/[slug].tsx` - Preview page with view toggle

4. ✅ Created UI components (inline in routes)
   - Sidebar - Template list with active highlighting
   - Topbar - Template name, Preview/HTML toggle, Copy button
   - PreviewFrame - Iframe with email HTML
   - CodeView - Monospace HTML source display

5. ✅ Created lib utilities
   - `src/lib/emails.ts` - Scans directory for .tsx/.jsx email files
   - `src/lib/render.ts` - Renders email component to HTML string

6. ✅ Updated CLI
   - Changed from custom Vite server to vinxi dev server
   - Updated package.json scripts

7. ✅ Tested end-to-end
   - Home page showing template list
   - Email preview working (welcome, verification-code)
   - HTML view working
   - Preview/HTML toggle working
   - Copy to clipboard working
   - Template switching working

## Dev Server Features
- Dark theme UI (similar to react-email)
- Template sidebar with active highlighting
- Email preview in iframe
- HTML source view
- Copy HTML button
- File-based routing

## Usage
```bash
# From project root
pnpm dev

# Or with custom emails directory
cd packages/dev-server
EMAILS_DIR=/path/to/emails pnpm exec vinxi dev --port 6008
```

## Future Enhancements
- Add file watcher for hot reload on template changes
- Add syntax highlighting for HTML view
- Add resizable preview frame
- Add send test email functionality

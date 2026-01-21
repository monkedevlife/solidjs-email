# Monorepo Setup Guide

This guide explains how to install and use solidjs-email in a Turborepo (or similar) monorepo.

## Installation

You have two options for installation:

### Option 1: Main Package (Recommended)

Install the main `solidjs-email` package which includes everything:

```bash
# Using pnpm (recommended for Turborepo)
pnpm add solidjs-email solid-js --filter your-app-name

# Or from the package directory
cd apps/your-app
pnpm add solidjs-email solid-js
```

### Option 2: Individual Packages

Install only the packages you need:

```bash
pnpm add @solidjs-email/render @solidjs-email/button @solidjs-email/container solid-js --filter your-app-name
```

## Project Structure

A typical Turborepo setup:

```
your-turborepo/
├── apps/
│   ├── web/                    # Your main app
│   └── emails/                 # Email templates app (optional)
├── packages/
│   └── email-templates/        # Shared email templates (optional)
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

## Configure turbo.json

Add build dependencies if you have a dedicated email package:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## Create Email Templates

Create an email template file (e.g., `apps/web/src/emails/welcome.tsx`):

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'solidjs-email';

export const WelcomeEmail = (props: { name: string }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body class="bg-white font-sans">
        <Preview>Welcome to our platform!</Preview>
        <Container class="mx-auto max-w-[560px] px-4 py-8">
          <Heading class="text-2xl font-bold text-gray-900">
            Hello, {props.name}!
          </Heading>
          <Text class="text-gray-600">
            Welcome to our platform. We're excited to have you!
          </Text>
          <Section class="text-center my-8">
            <Button
              class="bg-blue-600 text-white px-6 py-3 rounded-md"
              href="https://example.com/get-started"
            >
              Get Started
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
```

## Render and Send Emails

```tsx
import { render } from 'solidjs-email';
import { WelcomeEmail } from './emails/welcome';

// In your API route or server function
export async function sendWelcomeEmail(userEmail: string, userName: string) {
  const html = await render(() => <WelcomeEmail name={userName} />);
  
  // With Resend
  await resend.emails.send({
    from: 'hello@example.com',
    to: userEmail,
    subject: 'Welcome!',
    html,
  });
}
```

## Shared Email Package (Optional)

If you want to share email templates across multiple apps, create a dedicated package:

**packages/email-templates/package.json:**

```json
{
  "name": "@your-org/email-templates",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts"
  },
  "dependencies": {
    "solidjs-email": "^0.0.1"
  },
  "peerDependencies": {
    "solid-js": "^1.9.0"
  }
}
```

**packages/email-templates/src/index.ts:**

```tsx
export * from './welcome';
export * from './reset-password';
// ... other email templates
```

Then in your apps:

```bash
pnpm add @your-org/email-templates --filter web
```

## Requirements

| Aspect | Requirement |
|--------|-------------|
| Package Manager | pnpm recommended |
| Node Version | >= 20.0.0 |
| Peer Dependency | `solid-js ^1.9.0` |

## Rendering Options

```tsx
// Basic render
const html = await render(() => <MyEmail />);

// Pretty print HTML (for debugging)
const prettyHtml = await render(() => <MyEmail />, { pretty: true });

// Plain text version (for email fallback)
const plainText = await render(() => <MyEmail />, { plainText: true });

// With Tailwind configuration
const htmlWithTailwind = await render(() => <MyEmail />, {
  tailwind: {
    config: { theme: { extend: {} } },
  },
});
```

## Available Packages

### Main Package

| Package | Description |
|---------|-------------|
| `solidjs-email` | All components + render utilities |

### Individual Packages

| Package | Description |
|---------|-------------|
| `@solidjs-email/render` | HTML rendering utilities |
| `@solidjs-email/html` | Html wrapper component |
| `@solidjs-email/head` | Head component |
| `@solidjs-email/body` | Body component |
| `@solidjs-email/button` | Button component |
| `@solidjs-email/container` | Container component |
| `@solidjs-email/section` | Section component |
| `@solidjs-email/row` | Row component |
| `@solidjs-email/column` | Column component |
| `@solidjs-email/text` | Text paragraph |
| `@solidjs-email/link` | Link anchor |
| `@solidjs-email/heading` | Heading h1-h6 |
| `@solidjs-email/img` | Image component |
| `@solidjs-email/hr` | Horizontal rule |
| `@solidjs-email/preview` | Preview text |
| `@solidjs-email/font` | Custom fonts |
| `@solidjs-email/markdown` | Markdown renderer |
| `@solidjs-email/code-block` | Syntax highlighted code |
| `@solidjs-email/code-inline` | Inline code |
| `@solidjs-email/tailwind` | Tailwind CSS support |
| `@solidjs-email/components` | All components (barrel export) |

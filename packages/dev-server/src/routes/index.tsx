import { Show, type Component } from 'solid-js';
import { A } from '@solidjs/router';
import { cache, createAsync } from '@solidjs/router';

export default function Home() {
  const data = createAsync(() => fetchTemplates());

  return (
    <div class="flex h-screen bg-[var(--color-bg)]">
      <Sidebar templates={data()?.templates ?? []} />
      <main class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div class="text-6xl mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              class="mx-auto text-[var(--color-text-muted)]"
              aria-label="Email icon"
            >
              <title>Email icon</title>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h1 class="text-2xl font-semibold text-[var(--color-text)] mb-2">
            SolidJS Email
          </h1>
          <p class="text-[var(--color-text-muted)] max-w-md">
            Select an email template from the sidebar to preview it, or create a
            new template in your emails directory.
          </p>
        </div>
      </main>
    </div>
  );
}

const fetchTemplates = cache(async () => {
  'use server';
  const { getEmailTemplates } = await import('../lib/emails');
  const emailsDir = process.env.EMAILS_DIR || './emails';
  const templates = getEmailTemplates(emailsDir);
  return { templates };
}, 'templates');

const Sidebar: Component<{ templates: { name: string; slug: string }[] }> = (
  props
) => {
  return (
    <aside class="w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] flex flex-col">
      <div class="p-4 border-b border-[var(--color-border)]">
        <A
          href="/"
          class="font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)]"
        >
          SolidJS Email
        </A>
      </div>
      <div class="p-4 border-b border-[var(--color-border)]">
        <h3 class="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Templates
        </h3>
      </div>
      <nav class="flex-1 overflow-y-auto p-2">
        <Show
          when={props.templates.length > 0}
          fallback={
            <p class="text-sm text-[var(--color-text-muted)] p-2">
              No templates found
            </p>
          }
        >
          <ul class="space-y-1">
            {props.templates.map((template) => (
              <li>
                <A
                  href={`/preview/${template.slug}`}
                  class="block px-3 py-2 rounded text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text)] transition-colors"
                >
                  {template.name}
                </A>
              </li>
            ))}
          </ul>
        </Show>
      </nav>
    </aside>
  );
};

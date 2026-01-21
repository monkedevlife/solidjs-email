import { createSignal, createResource, Show, type Component } from 'solid-js';
import { useParams, A } from '@solidjs/router';
import { cache, createAsync } from '@solidjs/router';

type ViewMode = 'preview' | 'html';

export default function PreviewPage() {
  const params = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = createSignal<ViewMode>('preview');
  const [copied, setCopied] = createSignal(false);

  const emailData = createAsync(() => fetchEmailData(params.slug));

  const copyToClipboard = async () => {
    const data = emailData();
    if (data?.html) {
      await navigator.clipboard.writeText(data.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div class="flex h-screen bg-[var(--color-bg)]">
      <Sidebar templates={emailData()?.templates ?? []} currentSlug={params.slug} />
      <div class="flex-1 flex flex-col">
        <Topbar
          title={emailData()?.template?.name ?? 'Loading...'}
          viewMode={viewMode()}
          onViewModeChange={setViewMode}
          onCopy={copyToClipboard}
          copied={copied()}
        />
        <main class="flex-1 overflow-hidden">
          <Show when={emailData()?.error}>
            <div class="p-8 text-red-400">
              <h2 class="text-lg font-semibold mb-2">Error</h2>
              <pre class="text-sm bg-red-900/20 p-4 rounded overflow-auto">
                {emailData()?.error}
              </pre>
            </div>
          </Show>
          <Show when={!emailData()?.error}>
            <Show when={viewMode() === 'preview'}>
              <PreviewFrame html={emailData()?.html ?? ''} />
            </Show>
            <Show when={viewMode() === 'html'}>
              <CodeView html={emailData()?.html ?? ''} />
            </Show>
          </Show>
        </main>
      </div>
    </div>
  );
}

const fetchEmailData = cache(async (slug: string) => {
  'use server';
  const { getEmailTemplates, getEmailBySlug } = await import('../../lib/emails');
  const { renderEmailTemplate } = await import('../../lib/render');

  const emailsDir = process.env.EMAILS_DIR || './emails';
  const templates = getEmailTemplates(emailsDir);
  const template = getEmailBySlug(emailsDir, slug);

  if (!template) {
    return {
      templates,
      template: null,
      html: '',
      error: `Template "${slug}" not found`,
    };
  }

  const result = await renderEmailTemplate(template.path);

  return {
    templates,
    template,
    html: result.html,
    error: result.error,
  };
}, 'email-data');

const Sidebar: Component<{
  templates: { name: string; slug: string }[];
  currentSlug?: string;
}> = (props) => {
  return (
    <aside class="w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] flex flex-col">
      <div class="p-4 border-b border-[var(--color-border)]">
        <A href="/" class="font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)]">
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
                  class={`block px-3 py-2 rounded text-sm transition-colors ${
                    props.currentSlug === template.slug
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text)]'
                  }`}
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

const Topbar: Component<{
  title: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onCopy: () => void;
  copied: boolean;
}> = (props) => {
  return (
    <header class="h-14 px-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg-secondary)]">
      <h1 class="font-medium text-[var(--color-text)]">{props.title}</h1>
      <div class="flex items-center gap-2">
        <div class="flex bg-[var(--color-bg-tertiary)] rounded p-1">
          <button
            type="button"
            onClick={() => props.onViewModeChange('preview')}
            class={`px-3 py-1 text-sm rounded transition-colors ${
              props.viewMode === 'preview'
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => props.onViewModeChange('html')}
            class={`px-3 py-1 text-sm rounded transition-colors ${
              props.viewMode === 'html'
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            HTML
          </button>
        </div>
        <button
          type="button"
          onClick={props.onCopy}
          class="px-3 py-1.5 text-sm rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-2"
        >
          {props.copied ? (
            <>
              <CheckIcon />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon />
              Copy HTML
            </>
          )}
        </button>
      </div>
    </header>
  );
};

const PreviewFrame: Component<{ html: string }> = (props) => {
  return (
    <div class="h-full p-4 bg-[var(--color-bg-tertiary)]">
      <div class="h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <iframe
          srcdoc={props.html}
          class="w-full h-full border-0"
          title="Email preview"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
};

const CodeView: Component<{ html: string }> = (props) => {
  return (
    <div class="h-full overflow-auto p-4">
      <pre class="text-sm font-mono text-[var(--color-text-muted)] whitespace-pre-wrap break-all bg-[var(--color-bg-secondary)] p-4 rounded-lg">
        {props.html}
      </pre>
    </div>
  );
};

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <title>Copy</title>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <title>Copied</title>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

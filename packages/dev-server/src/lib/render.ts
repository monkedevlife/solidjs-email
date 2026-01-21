import { render as solidRender } from '@solidjs-email/render';

export interface RenderResult {
  html: string;
  error?: string;
}

function stripScripts(html: string): string {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export async function renderEmailTemplate(
  templatePath: string
): Promise<RenderResult> {
  try {
    const timestamp = Date.now();
    const modulePath = `${templatePath}?t=${timestamp}`;

    const module = await import(/* @vite-ignore */ modulePath);

    const EmailComponent = module.default || module[Object.keys(module)[0]];

    if (!EmailComponent) {
      return {
        html: '',
        error: 'No email component found in module',
      };
    }

    const rawHtml = await solidRender(() => EmailComponent({}));
    const html = stripScripts(rawHtml);

    return { html };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      html: '',
      error: `Failed to render template: ${message}`,
    };
  }
}

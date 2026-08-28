import { getEmailBySlug, getEmailTemplates } from './emails';
import { renderEmailTemplate } from './render';

export async function fetchTemplates() {
  'use server';
  const emailsDir = process.env.EMAILS_DIR || './emails';
  return { templates: getEmailTemplates(emailsDir) };
}

export async function fetchEmailData(slug: string) {
  'use server';
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
}

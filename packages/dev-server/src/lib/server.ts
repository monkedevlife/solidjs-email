import { createServerFn } from '@tanstack/solid-start'
import { getEmailBySlug, getEmailTemplates } from './emails'
import { renderEmailTemplate } from './render'

export const fetchTemplates = createServerFn({ method: 'GET' }).handler(
  async () => {
    const emailsDir = process.env.EMAILS_DIR || './emails'
    const templates = getEmailTemplates(emailsDir)
    return { templates }
  }
)

export const fetchEmailData = createServerFn({ method: 'GET' })
  .inputValidator((d: string) => d)
  .handler(async ({ data: slug }) => {
    const emailsDir = process.env.EMAILS_DIR || './emails'
    const templates = getEmailTemplates(emailsDir)
    const template = getEmailBySlug(emailsDir, slug)

    if (!template) {
      return {
        templates,
        template: null,
        html: '',
        error: `Template "${slug}" not found`,
      }
    }

    const result = await renderEmailTemplate(template.path)

    return {
      templates,
      template,
      html: result.html,
      error: result.error,
    }
  })

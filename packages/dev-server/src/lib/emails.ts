import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, basename, extname, relative, resolve } from 'node:path';

export interface EmailTemplate {
  name: string;
  slug: string;
  path: string;
}

export interface EmailGroup {
  name: string;
  templates: EmailTemplate[];
  groups: EmailGroup[];
}

function slugify(name: string): string {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function isEmailFile(filename: string): boolean {
  const ext = extname(filename).toLowerCase();
  return ['.tsx', '.jsx'].includes(ext) && !filename.includes('.spec.');
}

export function resolveEmailsDir(emailsDir: string): string {
  if (emailsDir.startsWith('/')) {
    return emailsDir;
  }
  return resolve(process.cwd(), emailsDir);
}

export function getEmailTemplates(emailsDir: string): EmailTemplate[] {
  const resolvedDir = resolveEmailsDir(emailsDir);
  
  if (!existsSync(resolvedDir)) {
    return [];
  }

  const templates: EmailTemplate[] = [];

  function scanDirectory(dir: string) {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && isEmailFile(entry)) {
        const name = basename(entry, extname(entry));
        const relativePath = relative(resolvedDir, fullPath);
        const slug = slugify(relativePath);

        templates.push({
          name,
          slug,
          path: fullPath,
        });
      }
    }
  }

  scanDirectory(resolvedDir);

  return templates.sort((a, b) => a.name.localeCompare(b.name));
}

export function getEmailBySlug(
  emailsDir: string,
  slug: string
): EmailTemplate | undefined {
  const templates = getEmailTemplates(emailsDir);
  return templates.find((t) => t.slug === slug);
}

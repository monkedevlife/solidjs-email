import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { render } from '@solidjs-email/components';
import { CustomThemeEmail } from './emails/custom-theme';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tailwindCss = readFileSync(join(__dirname, 'tailwind.css'), 'utf-8');

async function main() {
  console.log('=== TailwindCSS v4 CSS-based Configuration Example ===\n');
  console.log('Using tailwind.css with @theme directives:\n');
  console.log(tailwindCss);
  console.log('\n---\n');

  console.log('Rendering Custom Theme Email...\n');
  const html = await render(
    () => <CustomThemeEmail username="Alex" productName="Acme" />,
    {
      tailwind: {
        css: tailwindCss,
      },
    },
  );
  console.log(html);
}

main().catch(console.error);

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import chokidar from 'chokidar';
import pc from 'picocolors';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export interface DevServerOptions {
  emailsDir: string;
  port: number;
}

interface EmailTemplate {
  slug: string;
  name: string;
  path: string;
}

function findPackagesDir(): string {
  let dir = process.cwd();
  while (dir !== '/') {
    const packagesPath = path.join(dir, 'packages');
    if (fs.existsSync(packagesPath) && fs.existsSync(path.join(packagesPath, 'render'))) {
      return packagesPath;
    }
    dir = path.dirname(dir);
  }
  return path.join(process.cwd(), 'node_modules', '@monkedevlife');
}

function getEmailTemplates(emailsDir: string): EmailTemplate[] {
  const absoluteDir = path.resolve(process.cwd(), emailsDir);

  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const files = fs.readdirSync(absoluteDir);
  return files
    .filter((file) => file.endsWith('.tsx') || file.endsWith('.jsx'))
    .map((file) => {
      const slug = file.replace(/\.(tsx|jsx)$/, '');
      return {
        slug,
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        path: path.join(absoluteDir, file),
      };
    });
}

async function renderEmail(
  templatePath: string,
  vite: ViteDevServer,
): Promise<string> {
  try {
    const mod = await vite.ssrLoadModule(templatePath);
    const EmailComponent = mod.default || Object.values(mod)[0];

    if (typeof EmailComponent !== 'function') {
      throw new Error('No valid email component found');
    }

    const { render } = await vite.ssrLoadModule('@monkedevlife/solidjs-email-render');
    const previewProps = EmailComponent.PreviewProps || {};
    const html = await render(() => EmailComponent(previewProps));
    return html;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    return `<html><body><pre style="color:red;padding:20px;font-family:monospace">${message}\n\n${stack}</pre></body></html>`;
  }
}

function createPreviewHtml(
  templates: EmailTemplate[],
  selectedSlug: string | null,
  emailHtml: string | null,
): string {
  const templateList = templates
    .map(
      (t) =>
        `<a href="/?template=${t.slug}" class="template-link ${selectedSlug === t.slug ? 'active' : ''}">${t.name}</a>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SolidJS Email Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { display: flex; height: 100vh; }
    .sidebar {
      width: 280px;
      background: #1a1a1a;
      color: #fff;
      padding: 20px;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .sidebar h1 { font-size: 18px; margin-bottom: 20px; color: #fff; }
    .sidebar h2 { font-size: 12px; text-transform: uppercase; color: #666; margin-bottom: 10px; }
    .template-link {
      display: block;
      padding: 10px 12px;
      color: #ccc;
      text-decoration: none;
      border-radius: 6px;
      margin-bottom: 4px;
      transition: background 0.2s;
    }
    .template-link:hover { background: #333; color: #fff; }
    .template-link.active { background: #5850ec; color: #fff; }
    .main { flex: 1; display: flex; flex-direction: column; }
    .toolbar {
      background: #f5f5f5;
      padding: 12px 20px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      gap: 10px;
    }
    .toolbar button {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    .toolbar button:hover { background: #f0f0f0; }
    .toolbar button.active { background: #5850ec; color: #fff; border-color: #5850ec; }
    .preview-container { flex: 1; overflow: auto; background: #f0f0f0; padding: 20px; }
    .preview-frame {
      background: #fff;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    .preview-frame iframe { width: 100%; height: 800px; border: none; }
    .code-view {
      flex: 1;
      overflow: auto;
      background: #1e1e1e;
      padding: 20px;
    }
    .code-view pre {
      color: #d4d4d4;
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 13px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .hidden { display: none !important; }
    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #666;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="sidebar">
      <h1>SolidJS Email</h1>
      <h2>Templates</h2>
      ${templateList || '<p style="color:#666">No templates found</p>'}
    </div>
    <div class="main">
      ${
        selectedSlug && emailHtml
          ? `
        <div class="toolbar">
          <button class="active" onclick="showView('preview')">Preview</button>
          <button onclick="showView('html')">HTML</button>
        </div>
        <div id="preview-view" class="preview-container">
          <div class="preview-frame">
            <iframe srcdoc="${emailHtml.replace(/"/g, '&quot;')}"></iframe>
          </div>
        </div>
        <div id="html-view" class="code-view hidden">
          <pre>${emailHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </div>
        `
          : `
        <div class="empty-state">
          Select a template to preview
        </div>
        `
      }
    </div>
  </div>
  <script>
    function showView(view) {
      const previewView = document.getElementById('preview-view');
      const htmlView = document.getElementById('html-view');
      const buttons = document.querySelectorAll('.toolbar button');
      
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      if (view === 'preview') {
        previewView.classList.remove('hidden');
        htmlView.classList.add('hidden');
      } else {
        previewView.classList.add('hidden');
        htmlView.classList.remove('hidden');
      }
    }

    const evtSource = new EventSource('/__hmr');
    evtSource.onmessage = () => window.location.reload();
  </script>
</body>
</html>`;
}

export async function startDevServer(options: DevServerOptions): Promise<void> {
  const { emailsDir, port } = options;
  const absoluteEmailsDir = path.resolve(process.cwd(), emailsDir);

  if (!fs.existsSync(absoluteEmailsDir)) {
    console.error(pc.red(`Error: Emails directory not found: ${absoluteEmailsDir}`));
    process.exit(1);
  }

  console.log(pc.dim('Starting Vite server...'));

  const packagesDir = findPackagesDir();
  console.log(pc.dim(`Using packages from: ${packagesDir}`));

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
    plugins: [solidPlugin({ ssr: true })],
    resolve: {
      alias: {
        '@monkedevlife/solidjs-email-render': path.join(packagesDir, 'render/src/index.ts'),
        '@monkedevlife/solidjs-email-html': path.join(packagesDir, 'html/src/index.ts'),
        '@monkedevlife/solidjs-email-head': path.join(packagesDir, 'head/src/index.ts'),
        '@monkedevlife/solidjs-email-body': path.join(packagesDir, 'body/src/index.ts'),
        '@monkedevlife/solidjs-email-tailwind': path.join(packagesDir, 'tailwind/src/index.ts'),
        '@monkedevlife/solidjs-email-button': path.join(packagesDir, 'button/src/index.ts'),
        '@monkedevlife/solidjs-email-container': path.join(packagesDir, 'container/src/index.ts'),
        '@monkedevlife/solidjs-email-section': path.join(packagesDir, 'section/src/index.ts'),
        '@monkedevlife/solidjs-email-row': path.join(packagesDir, 'row/src/index.ts'),
        '@monkedevlife/solidjs-email-column': path.join(packagesDir, 'column/src/index.ts'),
        '@monkedevlife/solidjs-email-text': path.join(packagesDir, 'text/src/index.ts'),
        '@monkedevlife/solidjs-email-link': path.join(packagesDir, 'link/src/index.ts'),
        '@monkedevlife/solidjs-email-heading': path.join(packagesDir, 'heading/src/index.ts'),
        '@monkedevlife/solidjs-email-img': path.join(packagesDir, 'img/src/index.ts'),
        '@monkedevlife/solidjs-email-hr': path.join(packagesDir, 'hr/src/index.ts'),
        '@monkedevlife/solidjs-email-preview': path.join(packagesDir, 'preview/src/index.ts'),
        '@monkedevlife/solidjs-email-font': path.join(packagesDir, 'font/src/index.ts'),
        '@monkedevlife/solidjs-email-markdown': path.join(packagesDir, 'markdown/src/index.ts'),
        '@monkedevlife/solidjs-email-components': path.join(packagesDir, 'components/src/index.ts'),
      },
    },
  });

  const clients: Set<http.ServerResponse> = new Set();

  const watcher = chokidar.watch(absoluteEmailsDir, {
    ignored: /node_modules/,
    persistent: true,
  });

  watcher.on('change', (changedPath) => {
    console.log(pc.dim(`File changed: ${path.basename(changedPath)}`));
    vite.moduleGraph.invalidateAll();
    for (const client of clients) {
      client.write('data: reload\n\n');
    }
  });

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://localhost:${port}`);

    if (url.pathname === '/__hmr') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });
      clients.add(res);
      req.on('close', () => clients.delete(res));
      return;
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    if (url.pathname === '/') {
      const templates = getEmailTemplates(emailsDir);
      const selectedSlug = url.searchParams.get('template');
      let emailHtml: string | null = null;

      if (selectedSlug) {
        const template = templates.find((t) => t.slug === selectedSlug);
        if (template) {
          emailHtml = await renderEmail(template.path, vite);
        }
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(createPreviewHtml(templates, selectedSlug, emailHtml));
      return;
    }

    if (url.pathname === '/api/render') {
      const slug = url.searchParams.get('template');
      const templates = getEmailTemplates(emailsDir);
      const template = templates.find((t) => t.slug === slug);

      if (!template) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Template not found' }));
        return;
      }

      const html = await renderEmail(template.path, vite);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ html }));
      return;
    }

    res.writeHead(404);
    res.end('Not found');
  });

  server.listen(port, () => {
    console.log();
    console.log(pc.cyan('  SolidJS Email Dev Server'));
    console.log();
    console.log(`  ${pc.green('➜')}  Local:   ${pc.cyan(`http://localhost:${port}`)}`);
    console.log(`  ${pc.green('➜')}  Emails:  ${pc.dim(absoluteEmailsDir)}`);
    console.log();
  });

  process.on('SIGINT', () => {
    watcher.close();
    server.close();
    vite.close();
    process.exit(0);
  });
}

import { describe, it, expect } from 'vitest';
import {
  createTailwindProcessor,
  processTailwindInHtml,
  collectClasses,
} from './tailwind';

describe('Tailwind utilities', () => {
  describe('collectClasses', () => {
    it('extracts classes from HTML', () => {
      const html = '<div class="bg-white p-4"><span class="text-red-500">Hello</span></div>';
      const classes = collectClasses(html);
      expect(classes).toContain('bg-white');
      expect(classes).toContain('p-4');
      expect(classes).toContain('text-red-500');
    });

    it('returns unique classes', () => {
      const html = '<div class="p-4"><span class="p-4">Hello</span></div>';
      const classes = collectClasses(html);
      expect(classes.filter((c) => c === 'p-4').length).toBe(1);
    });

    it('handles empty classes', () => {
      const html = '<div>No classes</div>';
      const classes = collectClasses(html);
      expect(classes).toHaveLength(0);
    });
  });

  describe('createTailwindProcessor', () => {
    it('creates a processor', async () => {
      const processor = await createTailwindProcessor(['p-4', 'bg-white']);
      expect(processor).toBeDefined();
      expect(processor.processClass).toBeDefined();
      expect(processor.getNonInlineStyles).toBeDefined();
    });

    it('processes simple classes', async () => {
      const processor = await createTailwindProcessor(['p-4']);
      const result = processor.processClass('p-4');
      expect(result.style).toBeDefined();
      expect(result.class).toBeUndefined();
    });

    it('preserves unknown classes', async () => {
      const processor = await createTailwindProcessor(['p-4']);
      const result = processor.processClass('p-4 custom-class');
      expect(result.class).toBe('custom-class');
    });

    it('accepts CSS-based configuration with @theme', async () => {
      const customCss = `
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@theme {
  --color-brand: #007291;
}
`;
      const processor = await createTailwindProcessor(['bg-brand'], { css: customCss });
      const result = processor.processClass('bg-brand');
      expect(result.style).toBeDefined();
      expect(Object.keys(result.style).length).toBeGreaterThan(0);
      const bgColor = result.style['background-color'] || result.style['backgroundColor'];
      expect(bgColor).toBeDefined();
      expect(bgColor).toMatch(/007291|rgb\(0,\s*114,\s*145\)/i);
    });

    it('accepts CSS config alongside JS config', async () => {
      const customCss = `
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@theme {
  --color-primary: #ff0000;
}
`;
      const processor = await createTailwindProcessor(
        ['bg-primary', 'text-blue-500'],
        {
          css: customCss,
          config: {
            theme: {
              extend: {
                colors: {
                  secondary: '#00ff00',
                },
              },
            },
          },
        },
      );
      const primaryResult = processor.processClass('bg-primary');
      expect(Object.keys(primaryResult.style).length).toBeGreaterThan(0);
      const bgColor = primaryResult.style['background-color'] || primaryResult.style['backgroundColor'];
      expect(bgColor).toBeDefined();
      expect(bgColor).toMatch(/ff0000|rgb\(255,\s*0,\s*0\)/i);
    });
  });

  describe('processTailwindInHtml', () => {
    it('processes HTML with Tailwind classes', async () => {
      const html = '<div class="p-4">Content</div>';
      const result = await processTailwindInHtml(html);
      expect(result).toContain('style=');
    });

    it('handles HTML without classes', async () => {
      const html = '<div>Content</div>';
      const result = await processTailwindInHtml(html);
      expect(result).toBe(html);
    });

    it('accepts CSS-based configuration', async () => {
      const html = '<div class="bg-custom">Content</div>';
      const customCss = `
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@theme {
  --color-custom: #123456;
}
`;
      const result = await processTailwindInHtml(html, { css: customCss });
      expect(result).toMatch(/background-color:(#123456|rgb\(18,52,86\))/);
    });

    it('processes custom spacing from CSS @theme', async () => {
      const html = '<div class="p-custom">Content</div>';
      const customCss = `
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@theme {
  --spacing-custom: 100px;
}
`;
      const result = await processTailwindInHtml(html, { css: customCss });
      expect(result).toContain('padding:100px');
    });
  });
});

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
  });
});

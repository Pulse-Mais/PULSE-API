import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    }
  },
});

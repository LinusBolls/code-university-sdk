import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

config({ path: '.env.testing' });

export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
  },
  test: {
    coverage: {
      reporter: ['text'],
    },
  },
});

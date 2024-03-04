import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';
import { resolve } from 'path';

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

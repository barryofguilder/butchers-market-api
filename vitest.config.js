import { defineConfig } from 'vitest/config';

// Kept separate from vite.config.js so vite-plugin-node doesn't boot the server during tests.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    // Override values from a local .env so tests never touch a real database.
    env: {
      VITE_DB_URL: '',
      VITE_TOKEN_USERNAME: 'butcher',
      VITE_TOKEN_PASSWORD: 'test-password',
      VITE_TOKEN_SECRET: 'test-secret',
    },
  },
});

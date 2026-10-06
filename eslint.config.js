import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import n from 'eslint-plugin-n';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist/'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
  },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      // Response bodies from supertest are untyped JSON (`any`), and mocks are async stubs.
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/require-await': 'off',
    },
  },
  {
    // CommonJS: sequelize-cli loads migrations and seeders with require(), and .cjs files are
    // config read by tools that expect CommonJS.
    ...n.configs['flat/recommended-script'],
    files: ['src/db/migrations/**/*.js', 'src/db/seeders/**/*.js', '**/*.cjs'],
  },
  prettierRecommended
);

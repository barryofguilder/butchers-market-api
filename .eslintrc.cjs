'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // requireConfigFile: false,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: false,
    node: true,
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:prettier/recommended',
      ],
      rules: {
        // TypeScript reports undefined names itself.
        'no-undef': 'off',
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
    // node files
    {
      files: ['./db/migrations/*.js', './db/seeders/*.js'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs',
      },
      env: {
        browser: false,
        commonjs: true,
        node: true,
      },
      plugins: ['n'],
      extends: ['eslint:recommended', 'plugin:n/recommended', 'plugin:prettier/recommended'],
    },
  ],
};

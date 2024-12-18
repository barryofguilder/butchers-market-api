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
    // node files
    {
      files: ['./src/db/migrations/*.js', './src/db/seeders/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['n'],
      extends: ['eslint:recommended', 'plugin:n/recommended', 'plugin:prettier/recommended'],
    },
  ],
};

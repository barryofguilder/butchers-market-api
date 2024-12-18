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

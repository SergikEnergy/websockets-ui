export default {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'prettier', 'eslint:recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.json'],
  rules: { 'no-var': 'error', 'no-multiple-empty-lines': 'error' },
};

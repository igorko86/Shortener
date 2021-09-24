module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 2021,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'no-nested-ternary': 1,
    'max-classes-per-file': 1,
    'no-param-reassign': 1,
    'no-plusplus': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};

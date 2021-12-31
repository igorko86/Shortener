const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    createDefaultProgram: true,
    ecmaVersion: 2021,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['jsx-a11y', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-props-no-spreading': OFF,
    '@typescript-eslint/ban-ts-comment': WARN,
    '@typescript-eslint/no-explicit-any': WARN,
    'no-nested-ternary': WARN,
    'max-classes-per-file': WARN,
    'no-param-reassign': WARN,
    'react/react-in-jsx-scope': OFF,
    'react/no-array-index-key': OFF,
    'react/prop-types': OFF,
    'react/require-default-props': OFF,
    'react/no-unused-prop-types': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-inter': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'react/no-unescaped-entities': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
    'import/prefer-default-export': OFF,
    'react-hooks/exhaustive-deps': OFF,
    'no-plusplus': OFF,
    // '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': [
      ERROR,
      {
        endOfLine: 'auto',
      },
    ],
  },
};

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
    'react-app',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['jsx-a11y', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-props-no-spreading': 1,
    '@typescript-eslint/ban-ts-comment': 1,
    'no-nested-ternary': 1,
    'max-classes-per-file': 1,
    'no-param-reassign': 1,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-inter': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/no-unescaped-entities': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-plusplus': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};

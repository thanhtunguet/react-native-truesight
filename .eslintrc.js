module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
  },
};

module.exports = {
  extends: [
    'airbnb',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
    'json-format',
  ],
  parser: 'babel-eslint',
  rules: {
    'semi': ['error'],
    'react/jsx-key': 2,
    'react/no-unused-prop-types': 2,
    'object-curly-spacing': ['error', 'always'],
    'react/jsx-filename-extension': ['error', { 'extensions': ['.jsx', '.js'] }],
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
  },
  settings: {
    'import/resolver': {
      node: { paths: ['./src'], extensions: ['.js'] }
    },
  },
  plugins: [
    'cypress',
    'chai-friendly',
  ],
  env: {
    'cypress/globals': true
  },
};

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-key': 2,
    'react/no-unused-prop-types': 2,
    'object-curly-spacing': ['error', 'always'],
    'react/jsx-filename-extension': ['error', {'extensions': ['.jsx', '.js']}]
  },
  settings: {
    'import/resolver': {
      node: {paths: ['./src'], extensions: ['.js']}
    },
  },
  plugins: []
};

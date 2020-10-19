module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    amd: true
  },
  globals: {
    wx: true,
    GLOBAL_CONFIG: true,
    "$t": true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eqeqeq':'off'

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    'vue/multi-word-component-names': 0,
    quotes: [2, 'single', { 'avoidEscape': true }],
    'object-curly-spacing': ['error', 'always'],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/array-bracket-spacing': ['error', 'always'],
    'no-unused-vars': 0,
    semi: ['error', 'never'],
    'no-undef': 0
  }
}

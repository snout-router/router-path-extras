module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  plugins: [
    'jest',
  ],
  env: {
    jest: true,
  },
  rules: {
    'jest/no-focused-tests': 'warn',
  },
}

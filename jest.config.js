module.exports = {
  ...require('@snout/jest-config'),
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json',
    },
  },
}

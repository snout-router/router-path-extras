import config from '@snout/jest-config'

export default {
  ...config,
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json',
    },
  },
}

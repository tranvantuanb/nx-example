/* eslint-disable */
export default {
  displayName: 'auth',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub', // anything style related is ignored and mapped to jest-transform-stub module
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/auth',
  setupFilesAfterEnv: ['../../jest.setup.js'],
};

const defaultConfig = require('../../babel-workspace');

module.exports = {
  ...defaultConfig,
  presets: [
    [
      '@nrwl/react/babel',
      {
        runtime: 'automatic',
        useBuiltIns: 'usage',
        importSource: '@emotion/react',
      },
    ],
  ],
};

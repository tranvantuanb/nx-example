const withNx = require('@nrwl/next/plugins/with-nx');
const withAntdLess = require('next-plugin-antd-less');
const webpack = require('webpack');
const antdTheme = require('./styles/antdTheme');
const appSettings = require('./config/appSettings');

/**
 * @type {import("@nrwl/next/plugins/with-nx").WithNxOptions}
 **/

module.exports = withNx(
  withAntdLess({
    modifyVars: antdTheme,
    nextjs: {
      localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
    },
    staticPageGenerationTimeout: 180,
    webpack(config) {
      const webpackConfig = { ...config };
      // read .env
      webpackConfig.plugins.push(new webpack.EnvironmentPlugin(process.env));

      return webpackConfig;
    },
    env: {
      APP_SETTINGS: JSON.stringify(appSettings),
    },
    nx: {
      // Set this to true if you would like to to use SVGR
      // See: https://github.com/gregberge/svgr
      svgr: false,
    },
    images: {
      domains: ['ik.imagekit.io', 'cdn.carro.co'],
    },
  })
);
// module.exports = withNx(
//     nx: {
//       // Set this to true if you would like to to use SVGR
//       // See: https://github.com/gregberge/svgr
//       svgr: false,
//     },
//   })
// );

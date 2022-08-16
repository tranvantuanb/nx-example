module.exports = {
  plugins: [
    '@emotion/babel-plugin',
    'inline-react-svg',
    'babel-plugin-twin',
    'babel-plugin-macros',
    [
      'babel-plugin-styled-components',
      { ssr: true, displayName: true, preprocess: false },
    ],
    ['import', { libraryName: 'antd', style: true }],
  ],
};

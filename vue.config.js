/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'xenadu - prospect',
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/xenadu/xenadu-frontend/mission-monitor/dist/'
    : '/',
};

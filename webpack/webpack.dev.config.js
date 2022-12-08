const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
  },
  devServer: {
    static: {
      directory: commonConfig.externals.paths.dist,
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(c|sc)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
});

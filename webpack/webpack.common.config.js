const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: PATHS.src,
  output: {
    path: PATHS.dist,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|svg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      core: `${PATHS.src}/core`,
      components: `${PATHS.src}/components`,
      utils: `${PATHS.src}/utils`,
      pages: `${PATHS.src}/pages`,
      api: `${PATHS.src}/api`,
      services: `${PATHS.src}/services`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${PATHS.src}/index.html`,
      favicon: `${PATHS.src}/static/favicon.ico`,
    }),
  ],
};

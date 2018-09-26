const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals({
    whitelist: ['serialize-javascript'],
  })],
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      test: /\.jsx?$/,
      sourceMap: true,
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
  ],
};

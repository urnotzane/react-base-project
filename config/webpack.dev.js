const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8888,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('css/style.[hash].css').replace('css/js', 'css');
      },
      allChunks: true
    })
  ],
})
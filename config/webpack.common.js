const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    bundle: './src/index.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'es6-promise',
      'lodash',
      'history'
    ]
  },
  // 根据提供的选项将运行时代码拆分成单独的块，创建单个运行时 bundle(one runtime bundle)
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react - webpack4',
      favicon: './favicon.ico',
      template: path.resolve(__dirname, '../src', 'index.html'),
      filename: 'index.html'
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助 ServiceWorkers 快速启用
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true
    }),
    // 设置chunk大小和数量
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5, // 必须大于或等于 1
      minChunkSize: 1000
    }),
    // css分离
    new MiniCssExtractPlugin({
      filename: 'css/style.[hash].css',
      chunkFilename: 'css/style.[hash].css',
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:8]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              syntax: require('postcss-less'),
              plugins: [
                require('autoprefixer')(),
                require('postcss-import')(),
              ]
            }
          }, "less-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },]
  },

};
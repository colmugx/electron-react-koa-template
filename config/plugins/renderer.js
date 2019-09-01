const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('../const')

const defineEnv = {}

const basePlugins = [
  new webpack.DefinePlugin(defineEnv)
]

const devPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './config/plugins/template.html',
    inject: true,
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      'theme-color': '#333'
    },
  })
]

const prodPlugins = [
  new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  new HtmlWebpackPlugin({
    filename: `index.html`,
    template: './config/plugins/template.html',
    inject: true,
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      'theme-color': '#333'
    },
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  }),
  new MiniCssExtractPlugin({
    filename: config.assetsPath('css/[name].[contenthash].css'),
    chunkFilename: config.assetsPath('css/[name].[id].[contenthash].css')
  }),
  // new CopyWebpackPlugin([
  //   { from: 'public', to: 'app/public' }
  // ], {
  //   ignore: ['index.html']
  // })
]

module.exports = basePlugins.concat(config.isDev ? devPlugins : prodPlugins)

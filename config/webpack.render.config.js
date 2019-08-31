"use strict"
process.env.BABEL_ENV = 'renderer'

const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const config = require('./const')

const styleRules = require('./rules/style')
const scriptRules = require('./rules/script')
const staticRules = require('./rules/static')

const plugins = require('./plugins/renderer')
const optimization = require('./optimization/renderer')

const src = path.resolve(__dirname, '../src/renderer')

module.exports = {
  mode: process.env.APP_ENV ? 'production' : 'development',
  entry: {
    app: './src/renderer/index.tsx'
  },
  output: {
    path: config.runnerRoot,
    filename: 'renderer.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [src, config.NODE_MODULES],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      ...scriptRules(
        src,
        'renderer'
      ),
      ...styleRules(src),
      ...staticRules(src)
    ]
  },
  plugins,
  optimization,
  target: 'electron-renderer',
  stats: { children: false },
  performance: { hints: false }
}

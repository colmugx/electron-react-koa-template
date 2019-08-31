"use strict"
process.env.BABEL_ENV = 'main'

const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const config = require('./const')

const scriptRules = require('./rules/script')

const src = path.resolve(__dirname, '../src/main')

module.exports = {
  mode: !config.isDev ? 'production' : 'development',
  entry: {
    app: './src/main/index.ts'
  },
  output: {
    path: config.isDev ? config.runnerRoot : config.appRoot,
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [src, config.NODE_MODULES],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: scriptRules(
      src,
      'main'
    )
  },
  node: {
    __dirname: process.env.APP_ENV !== 'production',
    __filename: process.env.APP_ENV !== 'production'
  },
  target: 'electron-main',
  stats: { children: false },
  performance: { hints: false }
}

const path = require('path')

module.exports = {
  APP_NAME: '',
  isDev: process.env.APP_ENV === 'development',
  root: path.resolve(__dirname, '../'),
  runnerRoot: path.resolve(__dirname, '../devRunner'),
  appRoot: path.resolve(__dirname, '../app'),
  NODE_MODULES: path.resolve(__dirname, '../node_modules'),
  DEFAULT_LIMIT: 10000,
  assetsPath: function(_path) {
    return path.posix.join(__dirname, '..', _path)
  }
}

const webpack = require('webpack')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.render.config')

build()

function build() {
  /** main */
  runner(mainConfig).then(console.log)
  runner(rendererConfig).then(console.log)
}

function runner(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err.stack || err)
      } else if (stats.hasErrors()) {
        const err = stats.toString({
          chunks: false,
          colors: true
        }).split(/\r?\n/).map(str => str + '\n').join('')

        reject(err)
      }

      resolve(stats.toString({
        chunks: false,
        colors: true
      }))

    })
  })
}

const path = require('path')
const spawn = require('child_process').spawn

const chalk = require('chalk')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const electron = require('electron')

const config = require('./const')
const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.render.config')

let hotMiddleware
let electronProcess
let procRestart = false

start()

function startRenderer() {
  return new Promise(resolve => {
    const compiler = webpack(rendererConfig)

    hotMiddleware = webpackHotMiddleware(compiler, {
      reload: true,
      log: false,
      heartbeat: 2500
    })

    compiler.plugin('done', stats => {
      log('renderer', stats.toString({
        colors: true,
        chunks: false
      }))
    })

    const app = new DevServer(compiler, {
      hot: true,
      quiet: true,
      before(app, ctx) {
        app.use(hotMiddleware)
        ctx.middleware.waitUntilValid(() => resolve())
      }
    })
    app.listen(4396)
  })
}

function startMain() {
  return new Promise(resolve => {
    const compiler = webpack(mainConfig)

    compiler.plugin('watch-run', (_, done) => {
      log('main', chalk.white.bold('compiling...'))
      hotMiddleware.publish({ action: 'compiling' })
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error('main', err)
        return
      }

      log('main', stats)

      if (electronProcess && electronProcess.kill) {
        procRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          procRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

function startElectron() {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(config.runnerRoot, 'main.js')])

  electronProcess.stdout.on('data', data => {
    log('electron', data)
  })
  electronProcess.stderr.on('data', data => {
    log('electron', data)
  })

  electronProcess.on('close', () => {
    if (!procRestart) process.exit()
  })
}

function start() {
  Promise.all([
    startRenderer(),
    startMain()
  ]).then(() => {
    startElectron()
  }).catch(err => console.error(err))
}

function log(proc, data) {
  console.log(`[${proc}]: ${data}`)
}

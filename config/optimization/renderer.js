const config = require('../const')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = !config.isDev ? {
  runtimeChunk: {
    name: 'manifest'
  },
  splitChunks: {
    chunks: 'all',
    minSize: 30000,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    cacheGroups: {
      default: false,
      commons: {
        name: 'commons',
        chunks: 'all',
        minChunks: 2,
        minSize: 0,
      },
      asynccommons: {
        chunks: 'async',
        minChunks: 2,
        name: 'async-commons',
        priority: 90,
      },
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        name: 'vendor',
        priority: 10,
        enforce: true
      }
    }
  },
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        reduceIdents: false,
        autoprefixer: false
      }
    })
  ]
} : {}

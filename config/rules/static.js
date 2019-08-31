
const config = require('../const')

module.exports = include => [
  {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      use: [getUrlloader('img')]
  },
  {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [getUrlloader('fonts')]
  },
  {
      test: /\.svg$/,
      loader: ['@svgr/webpack'],
      include
  }
]

function getUrlloader(name) {
  return {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: config.assetsPath(`${name}/[name].[hash:6].[ext]`)
    }
  }
}

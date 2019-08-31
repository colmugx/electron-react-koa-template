const config = require('../const')
const miniCSSPlugin = require('mini-css-extract-plugin')
const styleLoader = config.isDev ? 'style-loader' : miniCSSPlugin.loader

const sassLoader = {
  loader: 'sass-loader',
  options: {
    implementation: require('dart-sass')
  }
}

const typingsForCssModulesLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: (config.isDev
      ? '[name]__[local]___[hash:base64:5]'
      : '[local]___[hash:base64:5]'),
  }
}

module.exports = include => [
  {
    test: /\.css$/,
    include: /node_modules/,
    use: [styleLoader, 'css-loader', 'postcss-loader']
  },
  {
    test: /\.s[ac]ss$/,
    include,
    use: [styleLoader, typingsForCssModulesLoader, 'postcss-loader', sassLoader]
  }
]

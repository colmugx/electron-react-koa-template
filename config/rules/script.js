
const presets = [
  '@babel/preset-env', '@babel/preset-typescript'
]

const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
]

const mainLoader = {
  babelrc: false,
  presets: presets,
  plugins: plugins
}

const rendererLoader = {
  babelrc: false,
  presets: presets.concat(['@babel/preset-react']),
  plugins: plugins.concat([
    ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
    'react-hot-loader/babel'
  ])
}


const uses = {
    main: mainLoader,
    renderer: rendererLoader
}

const jsLoader = type => ({
  loader: 'babel-loader',
  options: uses[type]
})

module.exports = (include, type) => [
  {
    test: /\.(j|t)sx?$/,
    include,
    exclude: /node_modules/,
    use: [jsLoader(type)]
  }
]

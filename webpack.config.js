'use strict'

const webpack = require('webpack')
const path = require('path')
const env = process.env.WEBPACK_ENV
const $uglify = webpack.optimize.UglifyJsPlugin
const $nodeExternals = require('webpack-node-externals')
const libraryName = 'wajs'
const plugins = []
let outputFile = ''

if (env === 'build') {
  plugins.push(new $uglify({ minimize: true, mangle: false }))
  outputFile = libraryName + '.min.js'
} else {
  outputFile = libraryName + '.js'
}

const config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js')
  ],
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  target: 'node',
  externals: [$nodeExternals({ whitelist: [/^babel-*/] })],
  module: {
    loaders: [
      {
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        test: /\.js$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      }
    ]
  },
  plugins: plugins
};

module.exports = config

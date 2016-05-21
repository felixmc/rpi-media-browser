/* eslint no-var: 0 */

const webpack = require('webpack')
const path    = require('path')

module.exports = {
  entry: {
    'media-browser': [path.join(__dirname, 'frontend/src/js/index')],
  },

  output: {
    path: path.join(__dirname, 'frontend/dist'),
    filename: '[name].bundle.js',
    library: '[name]',
    libraryTarget: 'umd',
    jsonpFunction: 'mediaBrowserJsonp',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        'media-browser',
      ],
    }),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
  ],

  devtool: '#inline-source-map',

  resolve: {
    root: [
      path.join(__dirname, 'frontend/src/js'),
    ],
    extensions: ['', '.js', '.json'],
    alias: {
      styles: path.join(__dirname, 'frontend/src/styles'),
      js: path.join(__dirname, 'frontend/src/js'),
    },
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    }],

    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.scss$/, loader: 'style!css!postcss!sass', exclude: /node_modules/},
      {test: /\.woff2?$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.ttf$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.eot$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
      {test: /\.svg$/, loader: 'file', query: {name: 'fonts/[hash].[ext]'}},
    ],
  },
}

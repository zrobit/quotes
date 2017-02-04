var path = require('path');
var webpack = require('webpack');
const nib = require('nib');
const stylusLoader = require('stylus-loader')

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    client: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/client/client.jsx'
    ],
    vendor: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'react', 'react-dom', 'mobx', 'mobx-react', 'react-router', 'axios'
    ]
  },
  output: {
    path: path.resolve(__dirname + 'dist/public/assets/scripts'),
    filename: '[name].min.js',
    publicPath: "http://localhost:8080/assets/scripts/"
  },
  devServer: { inline: true },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include:[
          path.resolve(__dirname, 'src/client')
        ],
        options: {
          presets: [['es2015',{"modules":false}], 'react'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          loader: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[local]-[hash:base64:5]',
                // localIdentName: '[name]-[local]-[hash:8]',
                modules: true
              }
            },
            {
              loader: 'stylus-loader'
            }
          ]
          // loader: "css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]",
          // publicPath: "./dist/public/assets/styles/"
        }),
        // loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        include: [
          path.resolve(__dirname, 'src/client')
        ]
      }

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'] // Specify the common bundle's name.
    }),
    new stylusLoader.OptionsPlugin({
      default: {
        use: [nib()]
      },
      preferPathResolver: 'webpack',
    }),
    new ExtractTextPlugin("style2.css")
  ]
};

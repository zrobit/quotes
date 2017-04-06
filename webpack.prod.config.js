var path = require('path');
var webpack = require('webpack');
const nib = require('nib');
const stylusLoader = require('stylus-loader')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    client: './src/client/client.jsx',
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'react-router', 'axios']
  },
  output: {
    path: path.resolve(__dirname, 'dist/public/assets/scripts'),
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src/client'),
        ],
        options: {
          babelrc: false,
          presets: [['es2015',{"modules":false}], 'react'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-object-rest-spread'
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        dead_code:true,
        drop_debugger:true,
        drop_console:true,
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'] // Specify the common bundle's name.
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin("../styles/chunks.css")
    // new webpack.optimize.AggressiveMergingPlugin()
  ],
};

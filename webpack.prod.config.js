var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    client: './src/assets/scripts/client.jsx',
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, 'build/public/scripts'),
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
          path.resolve(__dirname, 'src/assets/scripts'),
        ],
        options: {
          presets: [['es2015',{"modules":false}], 'react'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties'
          ]
        }
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
    new webpack.optimize.AggressiveMergingPlugin()
    // new webpack.optimize.AggressiveMergingPlugin()
  ],
};

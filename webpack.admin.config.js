const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    port: 9000
  },
  // devtool: 'eval',
  devtool: 'cheap-source-map',
  entry: {
    client: [
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      './src/admin/index.jsx'
    ],
    vendor: [
      'react', 'react-dom', 'admin-on-rest'
    ]
  },
  output: {
    path: path.resolve(__dirname + 'dist/admin/assets/scripts'),
    filename: '[name].min.js',
    publicPath: "http://localhost:9000/assets/scripts/"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include:[
          path.resolve(__dirname, 'src/admin')
        ],
        options: {
          babelrc: false,
          presets: [['es2015',{"modules":false}],'react'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'] // Specify the common bundle's name.
    })
  ]
};

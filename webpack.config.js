const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  resolve: {
    alias: {
      zlib: 'browserify-zlib'
    },
    fallback: {
      "assert": require.resolve("assert/"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "vm": require.resolve("vm-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "fs": false,
      "net": false,
      "tls": false,
      "async_hooks": false
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};

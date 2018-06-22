'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlAttributes = require('./app/htmlAttributes')
// const SitemapPlugin = require('sitemap-webpack-plugin');

const paths = Object.keys(HtmlAttributes).map(function(key) {
  return HtmlAttributes[key].filename;
});

module.exports = {
  entry: './app/index.js',

  devtool: 'source-map',

  output: {
    filename: 'js/bundle-[hash].js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: 'js/bundle-[hash].js.map'
  },

  module: {
    rules: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: { loader: 'css-loader', options: {url: false} },
          fallback: "style-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [{
                loader: "css-loader", options: {url: false}
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]'
        }
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
        query: {
          knownHelpers: ['json', 'isActive', 'title', 'headerAffix', 'streq'],
          partialDirs: [
            path.join(__dirname, 'templates', 'partials'),
            path.join(__dirname, 'templates', 'components')
          ],
          helperDirs: [
            path.join(__dirname, 'templates', 'helper')
          ]
        }
      }
    ]
  },


  plugins: [

    // cleaning up the destination directory before writing new files
    new CleanWebpackPlugin(['dist']),

    // Generate HTMLs
    new HtmlWebpackPlugin(HtmlAttributes.home),


    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),

    new ExtractTextPlugin('css/bundle-[hash].css'),

    // new SitemapPlugin('http://smartron.com', paths),
    new CopyWebpackPlugin([
      { from: 'images/', to: 'images/' }
    ]),
    // Copy the images folder and optimize all the images

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css)$/,
      minRatio: 0.8
    })
  ]
}

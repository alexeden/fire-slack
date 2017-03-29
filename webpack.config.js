const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
  // Base directory for resolving entry points
  context: path.resolve(__dirname, 'src'),

  entry: {
    styles: './scss/main.scss',
    vendor: './vendor.ts',
    app: './main.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.html'],
    modules: ['node_modules'],
    alias: {
      'util': path.resolve(__dirname, 'src/util/'),
      'app': path.resolve(__dirname, 'src/app/')
    }
  },

  module: {
    rules: [
      {
        test: /\.html$|\.json$/,
        loader: 'raw-loader'
      },
      {
        test: /\.tsx?|\.ts?$/,
        loaders: [
            {
                loader: 'awesome-typescript-loader'
            },
            'angular2-template-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: false,
      disable: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      // Specify the name of the common bundle
      names: ['vendor', 'manifest']
    }),

    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, 'src')
    ),

    new CircularDependencyPlugin({
      exclude: /node_modules/g
    }),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'assets'),
      to: 'assets'
    }])

  ],

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 4000
  }

};

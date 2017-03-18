const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
  // Base directory for resolving entry points
  context: path.resolve(__dirname, 'src'),

  entry: {
    vendor: './vendor.ts',
    styles: './styles.ts',
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
                // options: {
                //     useBabel: true
                // }
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
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        __dirname
    ),

  ],

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 4000
  }

};

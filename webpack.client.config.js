const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const paths = require('./webpack.paths');

module.exports = {
  // Base directory for resolving entry points
  target: 'web',
  context: paths.client.context,

  entry: {
    styles: './scss/main.scss',
    vendor: './vendor.ts',
    app: './main.ts'
  },

  output: {
    path: paths.client.dist,
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.html'],
    modules: ['node_modules'],
    alias: paths.client.alias
  },

  module: {
    rules: [
      {
        test: /\.html$|\.json$/,
        loader: 'raw-loader'
      },
      {
        test: /\.tsx?|\.ts?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: paths.client.tsconfig
            }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: {
          test: /\.(scss|sass)$/,
          not: [ /src\/scss/ ]

          // and: [ /\.(scss|sass)$/, /src\/app/ ]
        },
        use: [
          'raw-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ paths.client.styles ]
            }
          }
        ]
      },
      {
        test: {
          // test: /\.(scss|sass)$/,
          // not: [ /src\/app/ ]
          and: [ /\.(scss|sass)$/, /src\/scss/ ]
        },

        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
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

    new CommonsChunkPlugin({
      // Specify the name of the common bundle
      names: ['vendor', 'manifest']
    }),

    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      paths.client.context
    ),

    new CircularDependencyPlugin({
      exclude: /node_modules/g
    }),

    new CopyWebpackPlugin([{
      from: paths.client.assets,
      to: 'assets'
    }])

  ],

  devtool: 'inline-source-map',

  devServer: {
    port: 4000,
    // https: true,
    historyApiFallback: true
  }
};

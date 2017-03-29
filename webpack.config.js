const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const paths = {
  client: {
    context: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'client-dist'),
    tsconfig: path.resolve(__dirname, 'src', 'tsconfig.json'),
    assets: path.resolve(__dirname, 'assets'),
    alias: {
      'util': path.resolve(__dirname, 'src/util/'),
      'app': path.resolve(__dirname, 'src/app/')
    }
  },
  server: {
    context: path.resolve(__dirname, 'server'),
    dist: path.resolve(__dirname, 'server-dist'),
    tsconfig: path.resolve(__dirname, 'server', 'tsconfig.json')
  }
};

module.exports = [
  {
    target: 'node',
    context: paths.server.context,

    entry: './server.ts',

    output: {
      path: paths.server.dist,
      filename: 'server.js'
    }
  },
  {
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
          loaders: [
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
      contentBase: path.join(__dirname, 'client-dist'),
      publicPath: '/',
      port: 4000
    }
  }
];

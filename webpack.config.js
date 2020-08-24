const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const AutoDllPlugin = require('autodll-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

const version = require('./package.json').version;

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const DIR_TYPES = path.resolve(__dirname, 'src', '@types');
const DIR_CLIENT = path.resolve(__dirname, 'src', 'client');
const DIR_VENDOR = path.resolve(__dirname, 'src', 'vendor');
const DIR_OUTPUT = path.resolve(__dirname, 'build');


const publicPath = DEVELOPMENT
  ? `${process.env.ASSETS_CDN_URL}`
  : `${process.env.ASSETS_CDN_URL}${version}/`;

const config = {
  entry: {
    client: path.join(DIR_CLIENT, 'index.tsx'),
  },

  output: {
    path: DIR_OUTPUT,
    filename: DEVELOPMENT ? '[name].js' : '[name].[hash].js',
    publicPath: publicPath,
  },

  target: 'web',

  mode: DEVELOPMENT ? 'development' : 'production',

  devtool: "#source-map",

  devServer: {
    port: process.env.PORT_ASSETS,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    contentBase: './build',
    publicPath: '/',
    quiet: false,
    noInfo: false,
    clientLogLevel: 'none',
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: false,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    writeToDisk: true
  },

  optimization: {
    minimize: !DEVELOPMENT,
    minimizer: [new TerserPlugin()],
  },

  watch: DEVELOPMENT,
  watchOptions: {
    poll: 1000
  },

  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false
    }),

    new MiniCssExtractPlugin({
      filename: DEVELOPMENT ? '[name].css' : '[name].[hash].css',
    }),

    new AutoDllPlugin({
      debug: DEVELOPMENT,
      context: __dirname,
      filename: DEVELOPMENT ? '[name].js' : '[name].[contenthash].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'react-router',
          'react-router-dom',
          'react-transition-group',
          'redux-thunk',
          'classnames',
          'cross-fetch',
          'debug',
          'history',
          'immer',
          'lodash',
          'date-fns',
          'qs',
          'uuid',
          '@paralleldrive/react-feature-toggles',
          '@reduxjs/toolkit'
        ]
      },
    }),

    new WebpackManifestPlugin({
      writeToFileEmit: true,
      map: (file) => {
        file.name = file.path
          .replace(publicPath, '')
          .replace(/\.[a-f0-9]{20,}\./, '.');
        return file;
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        include: [DIR_CLIENT, DIR_TYPES],
      },

      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },

      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
        ],
      },

      {
        test: /\.scss$/,
        include: [
          DIR_CLIENT + '/components/',
          DIR_CLIENT + '/styles/',
        ],
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]___[hash:3]',
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [AutoPrefixer({remove: false})],
            }
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },

      {
        test: /\.js$|\.css$/,
        loader: 'file-loader',
        include: [
          DIR_VENDOR,
        ],
        options: {
          name: DEVELOPMENT ? '[name].[ext]' : '[name].[hash].[ext]',
        },
      },

      {
        test: /\.(mp4|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: DEVELOPMENT ? '[name].[ext]' : '[name].[hash].[ext]',
        }
      },

      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },

      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7,
              }
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  }
};

module.exports = config;

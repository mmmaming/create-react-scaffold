const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const excludeDir = /node_modules/;
const modulesDir = path.resolve(__dirname, 'src/modules');
// const AutoPrefixer = require('autoprefixer');
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    app: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', './src/index.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@containers': path.join(__dirname, 'src/containers'),
      '@modules': path.join(__dirname, 'src/modules'),
      '@components': path.join(__dirname, 'src/components'),
      '@constants': path.join(__dirname, 'src/constants'),
      '@assets': path.join(__dirname, 'src/assets'),
      '@common': path.join(__dirname, 'src/common'),

    }
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'project-scripts', 'loader')]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /\/node_modules/,
          priority: 1
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `manifest.${entrypoint.name}`
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'dynamic-loader',
            options: {
              currentPath: modulesDir
            }
          }
        ],
        include: [
          /[\\/]src[\\/]containers/,
          /[\\/]src[\\/]modules/
        ]
      },

      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: excludeDir
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[local]__[path][name]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[local]__[path][name]--[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(ttf|woff|svg|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '10000'
            }
          }
        ],
        exclude: excludeDir
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Crulse',
      template: './src/index.html',
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'favicon.ico')
    })
  ]
}
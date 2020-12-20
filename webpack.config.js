const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/js/index.tsx'),
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Caching'
    })
  ],
  resolve: {
    modules: ['node_modules', path.resolve('./src')],
    alias: {
      src: path.resolve(__dirname, './src')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/www'),
    filename: '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // получает имя, то есть node_modules/packageName/not/this/part.js
            // или node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // имена npm-пакетов можно, не опасаясь проблем, использовать
            // в URL, но некоторые серверы не любят символы наподобие @
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: require.resolve('css-modules-typescript-loader')
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-modules-values')
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  performance: {
    hints: false
  }
};

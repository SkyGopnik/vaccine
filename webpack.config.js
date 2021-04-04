const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, './src/js/index.tsx'),
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      inject: 'body'
    }),
    new CompressionPlugin()
  ],
  resolve: {
    modules: ['node_modules', path.resolve('./src')],
    alias: {
      src: path.resolve(__dirname, './src')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json'
      },
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

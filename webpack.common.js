const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');

module.exports = {
  target: 'web',
  entry: `${__dirname}/src/index`,
  output: {
    path: `${__dirname}/public/`,
    publicPath: '/',
    chunkFilename: '[name].[chunkhash:4].js',
    filename: '[name].[chunkhash:4].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
              presets: ['@babel/env'],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', //* : Creates style nodes from JS strings
          },
          {
            loader: 'css-loader', //* : Translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', //* : Compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.(mp3|pdf)$/,
        use: [{
          loader: 'file-loader',
        }],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(['public']),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[chunkhash:4].css',
      filename: '[name].[chunkhash:4].css',
    }),
    new CopyWebpackPlugin(
      [
        { from: './src/includes/', to: '' },
      ],
    ),
    new DefinePlugin({
      'process.env.NODE': JSON.stringify(process.env.NODE || 'development'),
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/js/index.js',
    second: './src/js/second.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          'css-loader',
          'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
                'file-loader?name=./images/[name].[ext]',
                {
                loader: 'image-webpack-loader',
                options: {}
                },
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/second.html',
      filename: 'second.html',
      chunks: ['second'],
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = [
  {
    mode: 'production',
    entry: {
      index: './src/style/index.css',
    },
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: () => [require('autoprefixer')({ grid: true, remove: false })],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  },
  merge(baseConfig, {
    mode: 'production',
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'editor.umd.js',
      library: 'Editor',
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'this',
    },
  }),
]

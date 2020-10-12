/* plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

/* utils */
const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8088,
    hot: true,
    contentBase: '.',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveApp('example/basic.html'),
      inject: true,
    }),
  ],
})

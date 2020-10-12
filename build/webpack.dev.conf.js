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
        publicPath: resolveApp('example'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: resolveApp('example/index.html'),
        }),
    ],
})

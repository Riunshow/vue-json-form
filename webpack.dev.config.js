const webpack = require('webpack')
const WebpackDevServerOutput = require('webpack-dev-server-output')
const baseConfig = require('./webpack.base.config')

// 开发模式
baseConfig.mode = 'development'
// 方便追踪源代码中的错误
baseConfig.devtool = 'source-map'

baseConfig.devServer = {
  contentBase: './dist',
  publicPath: '/dist/',
  hot: true
}
baseConfig.plugins.push(
  ...[
    new webpack.NamedModulesPlugin(),
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 将webpack-dev-server在内存中打包的文件输出为本地文件
    new WebpackDevServerOutput({
      path: './dist/',
      isDel: true
    })
  ]
)
module.exports = baseConfig
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./webpack.base.config')

baseConfig.mode = 'production'
baseConfig.plugins.push(
  ...[
    // 压缩代码 生产模式会默认调用改插件
    new UglifyJsPlugin()
  ]
)

module.exports = baseConfig
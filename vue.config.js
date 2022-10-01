const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //解决未经使用的变量问题
  lintOnSave: false,
  //非运行时只支持h函数生成的模板！！！！
  runtimeCompiler: true,
  //使用scss控制css样式
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    },
    electronBuilder:{
      customFileProtocol:"./"
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    },
  devServer:{
    port:2000
  },
})
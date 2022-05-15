module.exports = {
  transpileDependencies: true,
  //解决未经使用的变量问题
  lintOnSave: false,
  //非运行时只支持h函数生成的模板！！！！
  runtimeCompiler: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {extensions:[".ts",".tsx",".js",".json"]},
    module:{
      rules:[
        {
          test:/\.tsx?%/,
          loader:'ts-loader',
          exclude: /node_modules/,
          options:{
            appendTsSuffixTo:[/\.vue$/],
          }
        }
      ]
    }
  },
}
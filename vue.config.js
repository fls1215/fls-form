// 1.首先修改入口文件地址为examples下的main.js,
// 2.其次将packages加入打包编译任务中
// 3.将@等路径昵称修改掉
const path = require('path') // 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: './',
  // 1.更改入口和出口文件名
  pages: {
    index: {
      entry: 'examples/main.js',//修改入口
      template: 'public/index.html',
      filename: 'index.html'
    }

  },
  // 2.扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./examples')) //3.修改快捷路径
      .set('components', resolve('./examples/components'))
      .set('views', resolve('./examples/views'))
      .set('assets', resolve('./examples/assets'))
    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel - loader')
      .tap(options => {
        // 修改它的选项...

        return options
      })
  },
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'fls-ui',
  /* 放置生成的静态资源 (mixin、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: true,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: false,
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: 'localhost',
    port: 9999,
    https: false,
    hotOnly: false

  }
}
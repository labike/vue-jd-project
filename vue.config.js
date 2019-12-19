const path = require('path')

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      /* 生产环境配置 */
    } else {
      return {
        resolve: {
          alias: {
            '@js': path.resolve(__dirname, './src/assets/js'),
            '@css': path.resolve(__dirname, './src/assets/css'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@components': path.resolve(__dirname, './src/components')
          }
        }
      }
    }
  }
}
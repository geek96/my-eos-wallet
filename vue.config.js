const path = require('path');

module.exports = {
  lintOnSave: true,
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '../../theme.config': path.join(__dirname, 'src/styles/theme.config')
      }
    }
  }
}
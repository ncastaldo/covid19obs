module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    compression:{
      gzip: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json|csv)(\?.*)?$/i
      }
    }
  },
  configureWebpack: {
    plugins: []
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  }
}
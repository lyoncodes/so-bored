module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_config.scss";`
      }
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  }
};
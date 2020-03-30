module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_config.scss";`
      }
    }
  }
};
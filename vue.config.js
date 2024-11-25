const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    css: { 
      loaderOptions: { sass: { 
      // Prepend data to all .scss files
      additionalData: `@import "~@/assets/styles/global.scss";` 
      } 
    } 
  },
  runtimeCompiler : true
})
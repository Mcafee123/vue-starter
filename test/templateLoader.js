var vueTemplLoader = require('vue-template-loader')

module.exports = {
  process() {
    console.warn('templateLoader')
    console.warn(vueTemplLoader)
    // return '<div></div>'
  }
}
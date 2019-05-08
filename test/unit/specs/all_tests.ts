// import 'babel-polyfill'
import Vue from 'vue'

Vue.config.productionTip = false

interface WebpackRequire extends NodeRequire {
  context (file: string, flag?: boolean, exp?: RegExp): any
}

const wprequire = (require as WebpackRequire)

// Polyfill fn.bind() for PhantomJS
/* tslint:disable:no-var-requires */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
const testsContext = wprequire.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

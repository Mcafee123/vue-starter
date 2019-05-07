// require all modules ending in "_test" from the
// current directory and all subdirectories
const testsContext = require.context(".", true, /\.spec\.js$/)
console.warn(testsContext)
testsContext.keys().forEach(testsContext)

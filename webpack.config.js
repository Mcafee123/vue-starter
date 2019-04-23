const base = require('./webpack.base')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, argv) => {

    env = (env && env.development !== undefined) ? env : { development: false }
    if (env.development === true) {
        env.mode = 'development'
    } else {
        env.mode = 'production'
    }

    const cfg = base(env, argv)
    // set build mode
    cfg.mode = env.mode

    if (env.mode === 'production') {
        // minimize for production builds
        cfg.optimization = {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        }
        // no source-maps
        cfg.devtool = false
        console.log('Minimize, don\'t create Source Maps')
    } else {
        // don't minimize
        // source-maps
        cfg.devtool = 'source-map'
        console.log('Don\'t minimize, create Source Maps')
    }

    console.log('')
    console.log('Webpack-Konfiguration:')
    console.log('======================')
    console.log('mode: ' + cfg.mode)
    console.log('user: ' + process.env.USER)
    console.log('')

    return cfg
}

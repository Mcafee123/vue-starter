const base = require('./webpack.base')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, argv) => {

    env = (env && env.development !== undefined) ? env : { development: false }
    console.log(env)
    if (env.development === true) {
        env.mode = 'development'
    } else {
        env.mode = 'production'
    }

    const cfg = base(env, argv)
    // mode
    cfg.mode = env.mode
    // minimize
    if (!env.development) {
        cfg.optimization = {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        }
    }

    console.log('')
    console.log('Webpack-Konfiguration:')
    console.log('======================')
    console.log('mode: ' + cfg.mode)
    console.log('user: ' + process.env.USER)
    console.log('')

    return cfg
}

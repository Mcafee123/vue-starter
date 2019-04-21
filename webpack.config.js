const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    // Change to your "entry-point".
    entry: './lib/main',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'test/unit/specs'),
            "node_modules"
        ],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },{
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                    attrs: [':data-src']
                }
            },
            include: '/index.html/'
        },{
            test: /\.html$/,
            loader: 'vue-template-loader',
            options: {
                scoped: true,
                hmr: false,
            },
            exclude: /index.html/,
        },{
            test: /\.scss$/,
            enforce: 'post', // damit werden scoped css möglich, siehe vue-template-loader options
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // you can specify a publicPath here
                    // by default it uses publicPath in webpackOptions.output
                    publicPath: '../',
                    hmr: true,
                }
            },{
                loader: "css-loader"        // translates CSS into CommonJS
            }, {
                loader: "sass-loader",      // compiles Sass to CSS
                options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: 'src/index.html',
            inject: true,
            filename: 'index.html' //relative to root of the application
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'app.bundle.css',
            chunkFilename: '[id].css',
        })
    ]
}

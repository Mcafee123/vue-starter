const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
            exclude: /index.html/,
        },{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"      // creates style nodes from JS strings
            }, {
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
        })
    ]
}

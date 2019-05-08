const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports =(env, argv) => {
  return {
    entry: ['./lib/main'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.scss'],
      modules: [
        path.resolve(__dirname, 'src'),       // für HTML files
        path.resolve(__dirname, 'lib'),       // für Applikation
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
        loader: 'babel-loader'
      }, {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        },
        include: '/index.html/'         // Loader für index.html
      }, {
        test: /\.html$/,
        loader: 'vue-template-loader',
        options: {
          scoped: true,
          hmr: false,
        },
        exclude: /index.html/,          // Loader für Templates
      }, {
        test: /\.scss$/,
        enforce: 'post', // damit werden scoped css möglich, siehe vue-template-loader options
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: env.development,
          }
        }, {
          loader: "css-loader"        // translates CSS into CommonJS
        }, {
          loader: "sass-loader"       // compiles Sass to CSS
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
        chunkFilename: '[name].css'
      })
    ]
  }
}

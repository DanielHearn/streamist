
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: [
      '@babel/polyfill',
      './src/js/manytwitch.js'
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './../index.html',
      template: 'src/pug/index.pug',
      inject: false
    }),
    new AppManifestWebpackPlugin({
      logo: './src/favicons/Icon.png',
      persistentCache: true,
      inject: true,
      prefix: './favicons/',
      output: './../favicons/',
      config: {
        appName: 'Manytwitch',
        appDescription: 'Multiple Twitch Stream Viewer',
        developerName: 'Daniel Hearn',
        developerURL: 'https://danielhearn.co.uk',
        background: '#4f59a7',
        theme_color: '#4f59a7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/?homescreen=1',
        version: '1.0'
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: './../css/[name].css',
      chunkFilename: './../css/[[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader?attrs=false', 'pug-html-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "variables";',
              includePaths: [
                path.resolve(__dirname, './src/scss')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|xml|ico|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
  }
}

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction =
  process.argv[process.argv.indexOf('--mode') + 1] === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: ['@babel/polyfill', './src/js/app.js']
  },
  output: {
    filename: '[name].[hash].js?dh-1',
    path: path.resolve(__dirname, 'dist/js')
  },
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000,
    writeToDisk: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      exclude: ['/favicons']
    }),
    new MiniCssExtractPlugin({
      filename: './../css/main.[hash].css'
    }),
    new HtmlWebpackPlugin({
      filename: './../index.html',
      template: 'src/pug/index.pug',
      hash: true,
      inject: true
    }),
    new AppManifestWebpackPlugin({
      logo: './src/favicons/Icon.png',
      persistentCache: true,
      inject: true,
      prefix: isProduction ? '/streamist/favicons/' : '/favicons/',
      output: '../favicons/',
      config: {
        appName: 'Streamist',
        appDescription: 'Multiple Twitch Stream Viewer',
        developerName: 'Daniel Hearn',
        developerURL: 'https://danielhearn.co.uk',
        background: '#4f59a7',
        theme_color: '#4f59a7',
        display: 'standalone',
        orientation: 'portrait',
        version: '1.0'
      }
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{ from: 'src/img', to: '../img' }])
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
          'sass-loader'
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
  }
}

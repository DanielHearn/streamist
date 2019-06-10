const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.resolve(__dirname, './src/scss')]
        }
      }
    ]
  })

  return config
}

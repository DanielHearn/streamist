const path = require('path')

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
  })

  return config
}

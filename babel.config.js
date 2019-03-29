module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        debug: false
      }
    ]
  ],
  plugins: ['transform-es2015-modules-commonjs']
}

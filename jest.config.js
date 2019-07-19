module.exports = {
  setupFiles: ['./setup-jest.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@storybook/.*\\.vue$))'
  ]
}

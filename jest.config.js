module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    ".*\\.(js)$": "babel-jest"
  },
  testMatch : [
    "**/**/*.test.js"
  ],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    "browsers": [
      "chrome",
      "firefox",
      "safari"
    ]
  },
}

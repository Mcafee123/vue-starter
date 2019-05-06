module.exports = {

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "<rootDir>",
    "<rootDir>/src",
    "<rootDir>/test/unit",
    "node_modules"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts$": "babel-jest",
    "^.+\\.html$": "vue-template-loader",
    "^.+\\.scss": "sass-loader",
  }
}

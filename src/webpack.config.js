const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "fs": false, // fs is not needed in the browser environment
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify") // Added from the first snippet
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  // Other configurations...
};

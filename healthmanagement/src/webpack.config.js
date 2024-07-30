const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "fs": false, // fs is not needed in the browser environment
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  // Other configurations...
};

const path = require('path');

module.exports = function override(config, env) {
  // Set up the fallback for Node.js core modules in Webpack
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
  };
  
  return config;
};

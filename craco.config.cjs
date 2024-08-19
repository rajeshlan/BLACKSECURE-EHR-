const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    alias: {},
    configure: {
      resolve: {
        fallback: {
          "path": require.resolve("path-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          "vm": require.resolve("vm-browserify"),
          "buffer": require.resolve("buffer/"),
          "process": require.resolve("process/browser"),
        },
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
  },
};

const path = require("path");

const config = {
  entry: "./build/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  target: "node"
};

module.exports = config;

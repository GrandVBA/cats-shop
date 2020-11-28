const path = require("path");

module.exports = {
  entry: [
    "./js/menu-mobile.js",
    "./js/sorting.js",
    "./js/notification.js",
    "./js/validate-email.js",
    "./js/scroll-up.js",
    "./js/debounce.js",
    "./js/main.js"
  ],
  
  output: {
    filename: "wp.bundle.js",
    path: path.resolve(__dirname, "bundle"),
    iife: true
  },

  devtool: false
};
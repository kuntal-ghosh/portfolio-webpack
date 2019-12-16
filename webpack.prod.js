const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // new way of calling tha plugin using destructuring
const MIniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  //input is declared in the webpack.common.js file
  mode: "production",
  //output is used below
  output: {
    filename: "[name].bundle.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  //plugins are used below
  plugins: [
    new MIniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // this will generate html file in the dist folder using the template.html
      template: "./src/template.html",
      minify: {
        //minify is an option to minify the html code
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  //loders are used below
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: MIniCssExtractPlugin.loader
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader"
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("autoprefixer")];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
});

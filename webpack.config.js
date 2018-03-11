const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: '[name].css'
});

module.exports = {
  entry: {
    app: [ "./web/static/js/app.js", "./web/static/css/app.scss" ]
  },
  output: {
    path: path.resolve(__dirname, "./priv/static/"),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path[
          path.resolve(__dirname, "web/static/js")
        ],
        loader: "babel-loader", // options in .babelrc
      },
      {
        test: /\.scss$/,
        include: path[
          path.resolve(__dirname, "web/static/css")
        ],
        use: extractSass.extract({
          use: [ 'css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  plugins: [
    extractSass
  ]
};

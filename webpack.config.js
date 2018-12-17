const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractSass = new MiniCssExtractPlugin({
  filename: '[name].css'
});

module.exports = {
  entry: {
    app: [ "./web/static/js/app.jsx", "./web/static/css/app.scss" ]
  },
  output: {
    path: path.resolve(__dirname, "./priv/static/"),
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path[
          path.resolve(__dirname, "web/static/js")
        ],
        resolve: {
          extensions: [".js", ".jsx"]
        },
        exclude: /node_modules/,
        loader: "babel-loader", // options in .babelrc
      },
      {
        test: /\.scss$/,
        include: path[
          path.resolve(__dirname, "web/static/css")
        ],
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    extractSass
  ]
};

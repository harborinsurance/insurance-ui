var Webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    "./src/index.jsx",
    "./src/main.css",
    "./src/index.html"
  ],

  output: {
    path: __dirname + "/static",
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
        //Eslint loader
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"},
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader:'file' },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot","babel-loader"]}
      
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

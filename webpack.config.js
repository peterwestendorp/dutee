module.exports = {
  entry: "./src/example.ts",
  output: {
    path: __dirname + '/public',
    filename: "bundle.js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".js"]
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      }
    ]
  }
}
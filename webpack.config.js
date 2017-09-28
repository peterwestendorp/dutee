module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/build/assets',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname + '/public/',
    compress: true,
    port: 9000,
    publicPath: '/assets/'
  }
};
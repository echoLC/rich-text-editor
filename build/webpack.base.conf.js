const path = require('path')

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'editor.umd.js',
    library: 'Editor',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
}

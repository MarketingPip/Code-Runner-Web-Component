// webpack config for UOT Code Runner Component- created by Jared Van Valkengoed
import fs from 'fs';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

module.exports = {
  entry: `./src/code-runner-wc.js`,
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: `code-runner-wc.min.js`,
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              exportType: 'string'
            }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};

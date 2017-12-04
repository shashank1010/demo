import path from 'path'

import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

export default {
  entry: [
    './src/client',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(scss|css)$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'font-loader'
      }
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', ".json"],
    alias: {
      __CLIENT: path.resolve(__dirname, 'src/client/'),
      __SERVER: path.resolve(__dirname, 'src/server/'),
      __SHARED: path.resolve(__dirname, 'src/shared/')
    },
  },
  devServer: {
    port: WDS_PORT,
  },
}

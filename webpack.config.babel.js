import path from "path";

import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

export default {
	entry: [
		"./src/client",
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
		filename: 'js/bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
		],
	},
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
  },
}
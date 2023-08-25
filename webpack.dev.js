process.traceDeprecation = true;
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config');
// ESLintPlugin = require('eslint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
	// Set the mode to development or production
	mode: 'development',
	// Control how source maps are generated
	// devtool: 'source-map', //or 'source-map',//'cheap-module-source-map'

	// Spin up a server for quick development
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
			staticOptions: {
				redirect: true,
			},
		},
		watchFiles: [
			'./src/app/styles',
			'./src/app/ts',
			'./src/app/routers',
			'./src/app/serve.ts'
		],

		compess: true,
		historyApiFallback: true,
		open: true,
		port: 'auto'
	},

	plugins: [
		// Only update what has changed on hot reload
		new webpack.HotModuleReplacementPlugin(),
		new ESLintPlugin({
			files: path.join(__dirname, 'src/ts'),
		})
	]
});

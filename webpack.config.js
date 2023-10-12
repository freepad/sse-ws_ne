// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	mode: 'none',
	target: 'node18.17',
	output: {
		filename: 'server.js',// 'backend.[contenthash].js',
		path: path.resolve(__dirname, '../../../dist/backend'),
		library: {
			name: "server",
			type: 'commonjs'
		},
		clean: true

	},
	plugins: [
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				include: [
					path.resolve(__dirname, 'src/serve'),
					path.resolve(__dirname, '../db')
				]
			},
			{
				test: /\.js$/i,
				include: [
					path.resolve(__dirname, 'src/serve'),
					path.resolve(__dirname, '../db')
				],
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
						],
						configFile: "./babel.config.js"
					}
				}],
			},
			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
		exprContextCritical: false

	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};

// 'production';
// 'development';


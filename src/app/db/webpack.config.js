// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV == 'production';


module.exports = {
	entry: './src/index.js',
	mode: isProduction || "none",
	target: "node18.18",
	output: {
		path: path.resolve(__dirname, '../../../dist/db'),
		filename: 'index.[contenthash].js',
		clean: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map.[query]',
			exclude: path.resolve(__dirname, 'src'),
		})
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				// exclude: ['/node_modules/'],
				include: [
					path.resolve(__dirname, "src/db")
				]
			},
			{
				test: /\.js$/i,
				include: [
					path.resolve(__dirname, "src/db")
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
			// {
			// 	test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
			// 	type: 'asset',
			// },

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
		// exprContextCritical: false
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};

// module.exports = () => {
// 	if (isProduction) {
// 		config.mode = 'production';


// 	} else {
// 		config.mode = 'development';
// 	}
// 	return config;
// };

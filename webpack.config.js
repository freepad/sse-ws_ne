// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

// const isProduction = process.env.NODE_ENV == 'production';


module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	mode: 'none',
	target: 'node',
	output: {
		filename: 'backend.js',
		path: path.resolve(__dirname, '../../../dist'),
	},
	// plugins: [
	// Add your plugins here
	// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	// ],/
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				// exclude: ['/node_modules/'],
				// include: [
				// 	path.resolve(__dirname, 'src')
				// ],
				// options: {
				// 	configFile: path.resolve(__dirname, '../../../tsconfige.json')
				// }
			},
			{
				test: /\.js$/i,
				include: [
					path.resolve(__dirname, 'src')
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

// module.exports = () => {
// 	if (isProduction) {
// 		config.mode = 'production';


// 	} else {
// 		config.mode = 'development';
// 	}
// 	return config;
// };

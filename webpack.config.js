// Generated using webpack-cli https://github.com/webpack/webpack-cli
process.traceDeprecation = true;
const path = require('path');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;



module.exports = [

	{
		name: 'frontend_config',
		entry: './src/app/frontend/webpack.dev.js'
	},
	{
		name: 'backend_config',
		entry: './src/app/backend/webpack.dev.js',
	},
	{
		mode: process.env.MODE_ENV || 'none',
		entry: path.resolve(__dirname, './src/index.js'),

		// target: 'node',
		// stats: {
		// 	errorDetails: true
		// },
		// output: {
		// 	clean: true,
		// 	output: {
		// 		filename: 'index.js',
		// 		path: path.resolve(__dirname, 'dist/db')
		// 	},
		// },
		// module: {
		// 	rules: [
		// 		{
		// 			test: /\.(ts|tsx)$/i,
		// 			loader: 'ts-loader',
		// 			include: [
		// 				path.resolve(__dirname, 'src/app/db')
		// 			],

		// 			// options: {
		// 			// 	configFile: path.resolve(__dirname, './tsconfige.json')
		// 			// }
		// 		},
		// 		{
		// 			test: /\.js$/i,
		// 			include: [
		// 				path.resolve(__dirname, 'src/app/db')
		// 			],
		// 			use: [{
		// 				loader: 'babel-loader',
		// 				options: {
		// 					presets: [
		// 						['@babel/preset-env', { targets: "defaults" }]
		// 					],
		// 					plugins: [
		// 						'@babel/plugin-proposal-class-properties',
		// 					],
		// 					configFile: "./babel.config.js"
		// 				}
		// 			}],

		// 		},
		// 	]
		// },
		// resolve: {
		// 	extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
		// },
		// stats: {
		// 	errorDetails: false
		// }
	}];

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';


//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };

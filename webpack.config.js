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
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/i,
					// loader: 'ts-loader',
					// include: [
					// 	path.resolve(__dirname, 'src/app/db')
					// ],
					exclude: [
						path.resolve(__dirname, "/src/app/backend"),
						path.resolve(__dirname, "/src/app/db")
					]
					// options: {
					// 	configFile: path.resolve(__dirname, './tsconfige.json')
					// }
				},
				{
					test: /\.js$/i,
					exclude: [
						path.resolve(__dirname, "/src/app/db"),
						path.resolve(__dirname, "/src/app/backend")
					]
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
				},
				// 		},
				// 		{
				// 			test: /\.s[ac]ss$/i,
				// 			use: [
				// 				MiniCssExtractPlugin.loader,
				// 				'postcss-loader',
				// 				'sass-loader'
				// 			]
				// 		},
				// 		{
				// 			test: /\.css$/i,
				// 			use: ['css-loader', 'postcss-loader', MiniCssExtractPlugin.loader],
				// 		},
			]
		},
		resolve: {
			// extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
			alias: {
				my_db$: path.resolve(__dirname, "../dist/db")
			}
		},
		// stats: {
		// 	errorDetails: false
		// }
		plugins: [
			{

			},
		]
	}];

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';


//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };


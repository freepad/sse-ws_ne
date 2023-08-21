// Generated using webpack-cli https://github.com/webpack/webpack-cli
process.traceDeprecation = true;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;



module.exports = {
		mode: 'none',
	entry: './src/templates/index.js',
		target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
	},

	// devServer: {
	//     open: true,
	//     host: 'localhost',
	// },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/templates/index.js',
			minify: {
				// exclude the minification
				collapseWhitespace: false
			}
		}),

		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),

		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map.[query]',
			exclude: path.join(__dirname, './src'),
		}),


		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,

				loader: 'ts-loader',
				include: [
					path.resolve(__dirname, 'src/ts')
				],
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
						],
					}
				},],

			},
			{
				test: /\.s?[ac]ss$/i,
				include: [
					path.resolve(__dirname, './src')
				],
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					}, {
						loader: "sass-loader",

					}, {
						loader: 'postcss-loader'
					}
				],

			},
			{
				test: /\.html$/i,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			}
			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';


//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };

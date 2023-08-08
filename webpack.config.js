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
    entry: './src/index.js',
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
				template: './src/index.html',
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
                exclude: ['/node_modules/'],
						},
						{
							test: /\.js$/i,
							use: {
								loader: 'babel-loader',
								options: {
									presets: [
										['@babel/preset-env', { targets: "defaults" }]
									],
									plugins: [
										'@babel/plugin-proposal-class-properties',
									],
								}
							},
							exclude: ['/node_modules/'],
						},
            {
							test: /\.s[ac]ss$/i,
							use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
							use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
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

// Generated using webpack-cli https://github.com/webpack/webpack-cli
process.traceDeprecation = true;
const path = require('path');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;



module.exports = [
	{
		name: 'backend_config',
		entry: './src/app/backend/webpack.dev.js',
	},
	{
		name: 'frontend_config',
		entry: './src/app/frontend/webpack.dev.js'
	},
	{
		mode: 'none',
		entry: './src/index.js',
		stats: {
			errorDetails: true
		}
	}];

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';


//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };

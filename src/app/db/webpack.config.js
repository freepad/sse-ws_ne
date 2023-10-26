// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

// if (path.resolve(__dirname, 'src/serve/index.js')) {

// 	console.log('[file "src/db/index.js" ]: is found ');

// }
// else {
// 	console.log('[file "src/db/index.js" ]: is not found');
// }
module.exports = {
	mode: 'none',
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, '../../../dist')
	},

	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'src/result/src/app/db/src/db', to: 'backend/db', },
			],
		}),
	],
	module: {
		rules: [],
		exprContextCritical: false
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
}

// module.exports = () => {}
// 'production';
// 'development';


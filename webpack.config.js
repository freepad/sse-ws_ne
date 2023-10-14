// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	mode: 'none',
	target: 'node18.18',
	output: {
		filename: 'server.js',// 'backend.[contenthash].js',
		path: path.resolve(__dirname, '../../../dist/backend'),

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
				exclude: [
					/[\.\/]{1,}dist\/db\/maps/,
					/node_modules/
				],
				// include: [
				// 	path.resolve(__dirname, 'src/serve')
				// ]
			},
			{
				test: /\.js$/i,
				include: [
					path.resolve(__dirname, 'src/serve')
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
		alias: {
			/**
			 * https://github.com/auth0/node-auth0/issues/657#issuecomment-928083729
			 * ERORR: [!hexoid is not a function] was resolved
			 */
			'formidable': false, //  node-auth0 build warning
			'coffee-script': false, //  node-auth0 build fail
			'vm2': false, // node-auth0 build fail
			'yargs': false, // auth0-deploy-cli build warning
			'colors': false, // auth0-deploy-cli build warning
			'keyv': false, // openid-client build warning



			my_db2: path.resolve(__dirname, '../db/my_db.js') ///my_db.' + /my_db\.*{1.}[^map]\.js$/i

		},
	},
};

// 'production';
// 'development';


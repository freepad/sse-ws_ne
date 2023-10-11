module.exports = {
	"files": [

	],
	"ignores": [
		"./*.js",
		"./src/app/**/src/index.js",
		"**/webpack.*",
		"*.config.js",
		".*",

		"**/webpack.*.js",
		"webpack.*.js",


		"**/dist",

		"node_modules",
		"**/frontend/node_modules",
		"**/backend/node_modules",


		"**/package.json",

		"src/__tests__",
		"coverage",
		"websocket-polyfill.js",
		'src.v0',
		'main.js',
		'*log.*'
	],
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
	},
	"extends": ["airbnb-base",
		"standard-with-typescript"],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "ES2015",
		"sourceType": "module"
	},
	"rules": {
		"semi": ["error", {
			"omitLastInOneLineClassBody": true,
			"omitLastInOneLineBlock": true
		}],
		"prefer-const": "error",
		"linebreak-style": [
			"error",
			"windows"
		],

	},
	"parser": "babel-eslint",
}

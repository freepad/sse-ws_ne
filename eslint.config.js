module.exports = {
	"files": ["./src/app/**/*.ts"],
	"ignores": ["./*.js", "./src/index.js"],
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"jest": true,
	},
	"extends": ["airbnb-base",
		"standard-with-typescript"],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"semi": "error",
		"prefer-const": "error",
		"linebreak-style": [
			"error",
			"windows"
		],

	},
	"parser": "babel-eslint",
	"parser": "@typescript-eslint/parser"
}

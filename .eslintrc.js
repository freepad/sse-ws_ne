module.exports = {
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
		"ecmaVersion": "latest"
	},
	"rules": {
	},
	"parser": ["babel-eslint", "@typescript-eslint/parser"]
}

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 * https://jestjs.io/docs/cli#--watchall
 */

const jest = require('./jest.config.js');
// import type { Config } from 'jest';

module.exports = (jest, {
	testPathIgnorePatterns: [
		// "/node_modules/"
		"src/__tests__/__e2e__/*.*.js",
		"src/__tests__/__unit__/zero.test.js"
	],


});

// export default config;

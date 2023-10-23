process.traceDeprecation = true;
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
// const distСopies = require('./src/app/plugins/distСopies.ts')

// const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common);
// {
// 	files: [
// 		path.resolve(__dirname, 'src/app/frontend/src/ts'),
// 		path.resolve(__dirname, 'src/app/backend/src')
// 	]
// }

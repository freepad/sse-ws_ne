// const { join } = require('path');
module.exports = {

	preset: 'jest-puppeteer',
	launchOptions: {
		// Здесь можно добавить любые другие параметры, необходимые для запуска браузера с помощью puppeteer
		// headless: true,
		// args: ['--no-sandbox', '--disable-setuid-sandbox'],
		pipe: true,
		// Добавьте следующий параметр, чтобы использовать нативный WebSocket объект вместо 'ws'
		ignoreDefaultArgs: ['--disable-extensions'],
	},
}

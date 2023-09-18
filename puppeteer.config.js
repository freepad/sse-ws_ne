const jest = require('./jest.config');

module.exports = (jest, {
	// A preset that is used as a base for Jest's configuration
	//  указывает, что мы используем пресет ts-jest для работы с TypeScript
	preset: "jest-puppeteer", // 'jest-puppeteer',"ts-jest",  // undefined, //,

	// The paths to modules that run some code to configure or set up the testing environment before each test
	//Задает файлы, которые должны быть выполнены перед запуском тестов, например, для настройки окружения.
	setupFiles: ['./websocket-polyfill.js'],
	testMatch: [
		"**/__e2e__/(*.)+(test).[jt]s",
		"!**__unit__/EventsAutorization.test.js",
		"!**__unit__/zero.test.js"
	],

	launchOptions: {
		// Здесь можно добавить любые другие параметры, необходимые для запуска браузера с помощью puppeteer
		// headless: true,
		// args: ['--no-sandbox', '--disable-setuid-sandbox'],
		pipe: true,
		// Добавьте следующий параметр, чтобы использовать нативный WebSocket объект вместо 'ws'
		ignoreDefaultArgs: ['--disable-extensions', '--disable-web-security'],
	},
	// вид страницы
	viewport: {
		heught: 800,
		width: 1200,
	}
});


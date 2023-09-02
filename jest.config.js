/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 * https://jestjs.io/docs/cli#--watchall
 */

const { defaults } = require('jest-config');
// import type { Config } from 'jest';

module.exports = {

	// All imported modules in your tests should be mocked automatically
	automock: false,

	// Stop running tests after `n` failures
	bail: 2, // 0,

	// The directory where Jest should store its cached dependency information
	// Каталог, в котором Jest должен хранить свою кэшированную информацию о зависимостях
	cacheDirectory: "caches",

	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	// Включаем/отключаем отображение покрытия кода тестами
	/* Указывает, следует ли собирать информацию о покрытии во время выполнения теста.
Jest поставляется с двумя поставщиками покрытия: babel (по умолчанию) и v8.
 Смотрите опцию coverageProvider для получения более подробной информации.
*/
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	//Задает путь к файлам, для которых должно быть собрано покрытие кода
	/**
	 * Массив шаблонов глобусов, указывающий набор файлов, для которых должна быть собрана информация о покрытии.
	 *  Если файл соответствует указанному шаблону глобализации, для него будет собрана информация о покрытии,
	 * даже если для этого файла не существует тестов и он никогда не требуется в наборе тестов.
	 */

	collectCoverageFrom: [
		"**/ts/*.{js,jsx,ts}",
		"src/app/ts/*.{js,ts}",
		// '!**/node_modules/**',
		// '!**/vendor/**',
		// '!./*.(ts)|(js)',
		// "!**/__tests__"
		// 	"./src/app/ts"
	],

	// The directory where Jest should output its coverage files
	// Каталог, в который Jest должен выводить свои файлы покрытия
	coverageDirectory: "coverage",

	// An array of regexp pattern strings used to skip coverage collection
	// Папки и файлы, исключаемые из анализа покрытия тестами
	/**
	 * Массив строк шаблона регулярного выражения, которые сопоставляются со всеми путями к файлам
	 * перед выполнением теста.
	 * Если путь к файлу соответствует какому-либо из шаблонов, информация о покрытии будет пропущена.
	 * Эти строки шаблона совпадают с полным путем. Используйте строковый токен <rootDir>,
	 * чтобы указать путь к корневому каталогу вашего проекта, чтобы предотвратить случайное игнорирование
	 *  всех ваших файлов в разных средах, которые могут иметь разные корневые каталоги.
	 * Пример: ["<rootDir>/build/", "
	 */
	coveragePathIgnorePatterns: [
		"node_modules",
		"dist",
		// "./*.{js,jsx,ts}",
		// "!src/app/ts"
	],

	// Indicates which provider should be used to instrument code for coverage
	/*
	Указывает, какого поставщика следует использовать для определения кода покрытия. Допустимые значения - babel (по умолчанию) или v8.
	*/
	coverageProvider: "babel",

	// A list of reporter names that Jest uses when writing coverage reports
	// Вывод подробной информации о покрытии
	// Список имен репортеров, которые Jest использует при написании репортажных репортажей.Можно использовать любого стамбульского репортера.
	coverageReporters: [
		// "json",
		// "text",
		"lcov",
		// "clover"
	],

	// An object that configures minimum threshold enforcement for coverage results
	//Определяет пороги покрытия кода тестами, при достижении которых тест будет считаться неуспешным.
	// coverageThreshold: undefined,

	// A path to a custom dependency extractor
	// dependencyExtractor: undefined,

	// Make calling deprecated APIs throw helpful error messages
	// errorOnDeprecated: false,

	// The default configuration for fake timers
	// fakeTimers: {
	//   "enableGlobally": false
	// },

	// Force coverage collection from ignored files using an array of glob patterns
	// Принудительный сбор покрытия из игнорируемых файлов с использованием массива шаблонов глобусов
	// forceCoverageMatch: [],

	// A path to a module which exports an async function that is triggered once before all test suites
	//
	// globalSetup: undefined,

	// A path to a module which exports an async function that is triggered once after all test suites
	// globalTeardown: undefined,

	// A set of global variables that need to be available in all test environments
	// Глобальные переменные, доступные в каждом модуле тестов
	// globals: {  },

	// The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
	maxWorkers: 1,//"50%",

	// An array of directory names to be searched recursively up from the requiring module's location
	// Массив имен каталогов, подлежащих рекурсивному поиску по местоположению требуемого модуля
	// moduleDirectories: [
	//   "node_modules"
	// ],

	// An array of file extensions your modules use
	/**
	 *  определяет расширения файлов JavaScript, которые следует рассматривать как модули во время выполнения тестов.
	 *  Массив расширений файлов, используемых вашими модулями. Если вам требуются модули без указания расширения
	 *  файла, Jest будет искать эти расширения в порядке слева направо.
	 * Мы рекомендуем размещать расширения, наиболее часто используемые в вашем проекте,
	 * слева, поэтому, если вы используете TypeScript, вы можете рассмотреть возможность
	 * перемещения "ts" и/или "tsx" в начало массива.
	 */
	moduleFileExtensions: [
		...defaults.moduleFileExtensions,
		"js",
		// 	"mjs",
		// 	"cjs",
		// 	"jsx",
		"ts",
		// 	"tsx",
		// 	"json",
		// 	"node"
	],

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	// Позволяет создавать псевдонимы модулей, чтобы можно было импортировать их с использованием коротких имен в тестах.
	// moduleNameMapper: {},

	// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
	// modulePathIgnorePatterns: [
	// 	"src/__tests__/__unit__/"],

	// Activates notifications for test results
	// notify: false,

	// An enum that specifies notification mode. Requires { notify: true }
	// notifyMode: "failure-change",

	// A preset that is used as a base for Jest's configuration
	//  указывает, что мы используем пресет ts-jest для работы с TypeScript
	preset: "ts-jest",  // undefined, // "jest-puppeteer",

	// Run tests from one or more projects
	// projects: undefined,

	// Use this configuration option to add custom reporters to Jest
	// reporters: undefined,

	// Automatically reset mock state before every test
	// resetMocks: false,

	// Reset the module registry before running each individual test
	// resetModules: false,

	// A path to a custom resolver
	// resolver: undefined,

	// Automatically restore mock state and implementation before every test
	// restoreMocks: false,

	// The root directory that Jest should scan for tests and modules within
	// Директория, в которой находятся файлы тестов
	/**
	 * По умолчанию: корень каталога, содержащего ваш конфигурационный файл Jest или package.json или pwd,
	 *  если package.json не найден
	 * Корневой каталог, который Jest должен сканировать на наличие тестов и модулей внутри.
	 * Если вы помещаете свою конфигурацию Jest в свой package.json и хотите, чтобы корневой каталог
	 *  был корнем вашего репозитория, значением для этого параметра конфигурации по умолчанию будет
	 * каталог package.json.
	 * Часто вам захочется установить для этого значение 'src' или 'lib', соответствующее тому, где в
	 * вашем репозитории хранится код.
	 */
	// rootDir: path.join(__dirname, "src/__tests__/__unit__"),
	// rootDir: ,


	// Задает путь к корневому каталогу, где находятся файлы с тестами
	roots: [
		"./"
	],

	// Allows you to use a custom runner instead of Jest's default test runner
	runner: "jest-runner",

	// The paths to modules that run some code to configure or set up the testing environment before each test
	//Задает файлы, которые должны быть выполнены перед запуском тестов, например, для настройки окружения.
	// setupFiles: ['./websocket-polyfill.js'],

	// A list of paths to modules that run some code to configure or set up the testing framework before each test
	// setupFiles и setupFilesAfterEnv - позволяют подключить дополнительные файлы или модули, которые должны быть выполнены перед запуском тестов или после их запуска
	// setupFilesAfterEnv: ['src\\__tests__\\setupTests.js'],

	// The number of seconds after which a test is considered as slow and reported as such in the results.
	// slowTestThreshold: 5,

	// A list of paths to snapshot serializer modules Jest should use for snapshot testing
	// snapshotSerializers: [],

	// Устанавливает окружение тестирования, например, jsdom для тестирования в виртуальном браузере
	/* определяет окружение, в котором будет выполняться тестирование (например, браузерное окружение 'jsdom'
	или Node.js окружение 'node').
	Параметры тестовой среды, которые будут переданы в testEnvironment. Соответствующие варианты зависят от окружающей среды.
Например, вы можете переопределить параметры, переданные в jsdom:
	*/
	// testEnvironment: "jsdom", //"jest-environment-jsdom", // "jsdom", // 'node',//"jsdom",

	// Options that will be passed to the testEnvironment
	testEnvironmentOptions: {
		url: "http://localhost/",
		port: 9000,

	},

	// Adds a location field to test results
	// testLocationInResults: false,

	// Определяет шаблон для поиска файлов с тестами.
	// Массив путей к файлам тестов
	//позволяет указать шаблон или регулярное выражение для поиска и определения файлов JavaScript, которые должны быть протестированы
	// определяет шаблон для поиска файлов тестов. Здесь мы ищем файлы с расширением .spec.ts,
	//находящиеся в папке tests или ее подпапках
	// testMatch: [
	// 	"**/__e2e__/(*.)+(test).[jt]s",

	// 	"!**__unit__/EventsAutorization.test.js",
	// 	"!**__unit__/zero.test.js"
	// ],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	// определяет шаблоны файлов, которые должны быть проигнорированы при поиске тестов.
	// testPathIgnorePatterns: [
	// 	// "/node_modules/"
	// 	"src/__tests__/__unit__/EventsAutorization.test.js",
	// 	"src/__tests__/__unit__/zero.test.js"
	// ],

	// The regexp pattern or array of patterns that Jest uses to detect test files
	/* Шаблон или шаблоны, которые Jest использует для обнаружения тестовых файлов.
	По умолчанию он ищет файлы .js, .jsx, .ts и .tsxx внутри папок __tests__, а также любые файлы
	с суффиксом .test или .spec(например Component.test.js или Component.spec.js).Он также найдет файлы с именем test.js или
	 spec.js.Смотрите также testMatch [array < string >], но обратите внимание, что вы не можете указать оба параметра.
	 https://jestjs.io/docs/configuration#testregex-string--arraystring
	 */
	// testRegex: [
	// 	/\/?(\w*.)+(test)\.[jt]s/,
	// 	/\/__unit__\/*\.[jt]s$/,
	// ],

	// This option allows the use of a custom results processor
	// testResultsProcessor: undefined,

	// This option allows use of a custom test runner
	// testRunner: "jest-circus/runner",

	//Определяет преобразование файлов перед запуском тестов, например, используя Babel для поддержки современного синтаксиса
	// позволяет определить, какие преобразования должны быть применены к файлам JavaScript перед их выполнением во время тестирования.
	transform: {
		'\\.(ts|js|jsx|mjs)$': 'babel-jest',
		'\\.(ts|js|jsx|mjs)$': "ts-jest",
		// 	'^.+\.(css|less)$': 'config/jest/cssTransform.js',
		// 	'^(?!.*\.(js|jsx|mjs|css|less|json)$)': 'config/jest/fileTransform.js'
	},

	// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
	// transformIgnorePatterns: [
	//   "\\\\node_modules\\\\",
	//   "\\.pnp\\.[^\\\\]+$"
	// ],

	// An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
	// unmockedModulePathPatterns: undefined,

	// Indicates whether each individual test should be reported during the run
	// Указывает, следует ли сообщать о каждом отдельном тесте во время выполнения
	/*
	По умолчанию: false или true, если для запуска требуется только один тестовый файл
	Указывает, следует ли сообщать о каждом отдельном тесте
	во время выполнения. Все ошибки также по-прежнему будут отображаться внизу после выполнения.
	*/
	verbose: true, // undefined,

	// An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
	// watchPathIgnorePatterns: [],

	// Whether to use watchman for file crawling
	watchman: true,

};

// export default config;

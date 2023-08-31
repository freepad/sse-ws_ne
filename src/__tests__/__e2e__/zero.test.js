// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');


describe('Page start', () => {
	let browser; // запуск браузера
	let page;



	beforeEach(async () => { // перед КАЖДЫМ или перед beforAll всеми тестами(ом)
		browser = await puppeteer.launch({// options from the Doc-puppeteer
			headless: false, // really browser will be start work
			// args: ['--no-sandbox', '--disable-setuid-sandbox'],
			slowMo: 700,
			pipe: true,
			// ignoreDefaultArgs: ['--disable-extensions'],
			// devtools: true, // toolBox инструменты разработчика we can see
		});
		page = await browser.newPage(); // просим браузер открыть новую страницу
	}, 7000);

	// jest.useFakeTimers()
	test('test', () => {
		page.goto('http://localhost:9000'); // просим перейти на url (не забудь  запустить serve)
		// await page.waitFor('body'); // просто проверяем, что страница загрузилась и 'body' появился.
		page.waitForTimeout(3000);
	});

}, 15000);

afterAll(async () => { // после ВСЕХ или afterEach после КАЖДОГО теста закрываем
	await browser.close();
})

// describe('Google', () => {
// 	beforeAll(async () => {
// 		jest.useFakeTimers();
// 		await page.goto('https://google.com');
// 	});

// 	it('should be titled "Google"', async () => {
// 		await expect(page.title()).resolves.toMatch('Google');
// 	});
// });

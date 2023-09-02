const { handlers } = require('../../app/ts/functions');
const puppeteer = require('puppeteer');

let events = {};
let users = null;
let div = null;
let button;
const respons = test.each([
	{ a: 'zero test', b: 'Tute', expected: 'Ok' }
]);

jest.mock('node-fetch');

afterEach(() => {
	global.fetch = jest.fn(() => {
		Promise.resolve(() => {
			json: () => Promise.resolve({ 'status': 'Ok', 'ind': '456as-dsaf5-sd1f3-21s46' });
		});
	});

	jest.resetAllMocks();
	// https://jestjs.io/docs/jest-object#jestspyonobject-methodname


});
respons('click', async ({ a, b, expected }) => {
	let ev = null;
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 200,
		devtools: true,
		pipe: true,
	});
	const page = await browser.newPage();
	const inputValue = b;
	// const pageLocalH = await page.goto('http://localhost:9000');
	// await pageLocalH.waitForTimeout(300);
	// await pageLocalH.waitForSelector('.login');
	// const form = await pageLocalH.$('logi');



	await page.goto('http://localhost:9000')
	await page.evaluate(() => {
		document.body.addEventListener('submit', e => {
			e.preventDefault()
			ev = e;
			// ev['key'] = 'Enter';
			// ev['target'] = 'submit'
		});
	});
	await page.waitForSelector('#login');
	const input = await page.$('#login');
	await input.type(b);
	const button = await page.$('#go');
	await button.target();
	await button.type('submit');

	await button.click();

	// console.log('RESP: ', resp);

	await handlers.EventsAutorization(ev);
	page.waiteForOptions(15000);
	// const watchDog = page.waitForFunction('window.innerWidth < 100');
	// await page.setViewport({ width: 50, height: 50 });
	// const ev = new Event('click', { bubbles: true });
	// await watchDog;
	// const resp = domButton.click()
	debugger;
	expect(resp).toBe('button')
	await browser.close();
}, 17000);


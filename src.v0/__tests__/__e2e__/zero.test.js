// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');


describe('Page start', () => {
	let browser;
	let page;

	beforeEach(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 100,
			pipe: true,
			devtools: true,
		});

		page = await browser.newPage();
	});

	// jest.useFakeTimers()
	const respons = test.each([
		{ a: "Login one", b: "Luce", expected: "Luce" },

	]);
	// { a: "Login one", b: "Tute" },
	// { a: "Login one", b: "Luce" },
	// { a: "Login one", b: "Karl" },
	// { a: "Login one", b: "Tramp" },
	// { a: "Login one", b: "Sane" },
	// { a: "Login one", b: "Shina" },
	respons(`test .add(%a):`, async ({ a, b, expected }) => {
		await page.goto('http://localhost:9000'); // просим перейти на url (не забудь  запустить serve)
		await page.evaluate(() => {
			document.addEventListener('submit', e => { e.preventDefault(); });

		});

		const input = await page.waitForSelector('.login input');
		await input.type(b);
		const submit = await page.$('#go');
		await submit.click();

		// expect(submit).toBeCalled();
		// await page.waitForTimeout(10000);
		const boxLoging = await page.$('.accaunts');
		await console.log('---------', boxLoging);
		const accountArr = await boxLoging.$$('.accaunt__online_one');
		const account = await accountArr[accountArr.length - 1];
		const accountNamr = await account.$('.sourcename');
		await page.waitForTimeout(10000);
		await expect(accountNamr.TextContent).toBe(expected);
	}, 25000);

	afterEach(async () => {

		await browser.close();
	}, 5000);
}, 500);


// describe('Google', () => {
// 	beforeAll(async () => {
// 		jest.useFakeTimers();
// 		await page.goto('https://google.com');
// 	});

// 	it('should be titled "Google"', async () => {
// 		await expect(page.title()).resolves.toMatch('Google');
// 	});
// });

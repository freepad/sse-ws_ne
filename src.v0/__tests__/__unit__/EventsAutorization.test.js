const { handlers } = require('../../app/ts/functions.ts');
const puppeteer = require('puppeteer');
const { Persons } = require("../../app/ts/chating/users.ts");

let events = {};
let users = null;
let div = null;
let button;
const respons = test.each([
	{ a: 'zero test', b: 'Tutsy', expected: 'Ok' }
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
respons('clickEvent: ', async ({ a, b, expected }) => {
	let ev = {};
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 200,
		devtools: true,
		pipe: true,
	});
	const page = (await browser.page())[0];
	await browser.close();
	await page.goto('http://localhost:9000')


	await page.evaluate(() => {
		const newb = 'Tutsy';
		const form = document.querySelector('.login');

		form.addEventListener('submit', e => {
			e.preventDefault();


			let params = {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ login: newb }),
			}

			fetch('http://localhost:7070/', params)
				.then((result) => {
					if (!result.ok) return
					return result.json();
				})
				.then((result) => {
					const pesponse = Object.values(result)[0] === 'Ok' ? true : false
					if (pesponse === true) {
						newPerson = new Persons(inputValue);
						newPerson.addId = Object.values(result)[1]
					}
					return pesponse
				})
				.then((resp) => {
					const newLogin = document.querySelector('.login');
					if (!resp) {
						newLogin?.insertAdjacentHTML('beforeend', '<p style="color:red">Полуьзователь уже сузществует</p>');
						return
					}
					const body = document.getElementsByTagName('body');
					/* This's the Input forms from the mmain page- start */
					const formAuthorisation = body[0].querySelector('.author');
					formAuthorisation.setAttribute('style', 'display:none;');
					(body[0].querySelector('.chattalks > div:last-of-type')).removeAttribute('style');
					/* This's the Input forms - finished */

					const boxAccaunts = document.querySelectorAll('.accaunts');
					let personList = newPerson.participantsAdd = boxAccaunts;
					const perArr = personList[0].querySelectorAll('.accaunt__online_one');
					newPerson.personСss = perArr[perArr.length - 1];
					newPerson.personСss
					inputValue = '';
					return
				});

		});





	});
	const onStartCountUsers = await page.evaluate(() => {
		const usersErr = document.getElementsByClassName('accaunt__online_one');
		return (usersErr).length
	});
	ev['key'] = 'Enter';
	ev['target'] = {};
	ev['target']['type'] = 'submit';

	await console.log('EVENTS: ', ev);
	await page.waitForSelector('#login');
	const input = await page.$('#login');
	await input.type(b);
	const button = await page.$('#go');


	await button.click();
	await page.setDefaultTimeout(3000);

	await handlers.EventsAutorization(ev);

	const toFinishCountUsers = await page.evaluate(() => {
		const usersErr = document.getElementsByClassName('accaunt__online_one');
		return (usersErr).length
	});

	await page.waitForTimeout(25000);
	await expect(onStartCountUsers < toFinishCountUsers).toBe(true);
	await browser.close();
}, 17000);


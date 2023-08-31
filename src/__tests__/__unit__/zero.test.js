// import { fetchRequest } from '../../app/ts/fech-request';
// import { sendLoginStr } from './functions.js';
// const { sendLoginStr } = require("../../app/ts/functions.ts");
const { handlers } = require('../../app/ts/functions');
const { fetchRequest } = require('../../app/ts/fech-request');
const { fetch } = require('node-fetch');
let mockedFetch;

jest.mock('node-fetch');



const respons = test.each([
	{ a: "Test a 'Bony' It's a new Login:", b: "Bony", expected: 'Ok' },
	{ a: "Test a 'Bony' It's a new Login:", b: "Sony", expected: 'Ok' },
]);
respons(`$a`, (async ({ a, b, expected }) => {
	// afterEach(() => {
	// 	mockedFetch.mockClear();
	// });

	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve({ 'status': 'Ok' }),
		})
	);

	mockedFetch = new fetchRequest();
	const item = await mockedFetch.makePostRequest(b)
	const result = await item.json();
	const res = Object.values(result)[0];
	console.log('EXPECTED: ', expected);
	expect(res).toBe(expected)


}));



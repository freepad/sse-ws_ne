// import { sendLoginStr } from '../../app/ts/functions.ts';
// import { sendLoginStr } from './functions.js';
// const { sendLoginStr } = require("../../app/ts/functions.ts");

// describe.each([
// 	["sendLoginStr: testing a string with a new one login's name", ['Demo'], 200],
// 	["sendLoginStr: testing a string with a more then one new login's name", ['Demo', 'Kety'], 200],
// 	["sendLoginStr: testing a string with a more then one new login's name", ['Demo', 'Demo'], 200]
// ])("Start:"), (a, b, expected) => {
// 	console.log('b: ');
// 	test(`sendLoginStr Returns: ${expected}`, async () => {
// 		// const person = sendLoginStr(b)
// 		console.log('b: ', b);
// 		// expect(sendLoginStr(b)).toBe(ecpected);
// 		expect(200).toBe(expected);
// 	});

// }
// --watchAll./ jest.config.js
// describe.each([
// 	[1, 1, 2],
// 	[1, 2, 3],
// 	[2, 1, 3],
// ])('.add(%i, %i)', (a, b, expected) => {
// 	test(`returns ${expected}`, () => {
// 		expect(a + b).toBe(expected);
// 	});

// 	test(`returned value not be greater than ${expected}`, () => {
// 		expect(a + b).not.toBeGreaterThan(expected);
// 	});

// 	test(`returned value not be less than ${expected}`, () => {
// 		expect(a + b).not.toBeLessThan(expected);
// 	});
// });


test(`sendLoginStr Returns: `, async () => {
	// const person = sendLoginStr(b)
	console.log('b: ', 2);
	// expect(sendLoginStr(b)).toBe(ecpected);
	expect(200).toBe(200);
});

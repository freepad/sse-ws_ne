const { handlers } = require('../../app/ts/functions');

let events = {};
let users = null;
let div = null;
let button;
const respons = test.each([
	{ a: 'zero test', b: 'Enter', expected: 'Ok' }
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

	// document.body.innerHTML = `<div>
	// <button type="submit" id="button" />
	// </div>`;

	// const button = document.getElementById("button");
	const button = document.createElement('button');
	button.innerHTML = 'Нажми';
	button.type = 'submit';
	button.classList.add('butt');

	console.log('HTML: ', button.tagName);
	document.insertAdjacentElement('afterend', button);
	// document.body.innerHTML =
	// 	'<div>' +
	// 	'  <span id="username" />' +
	// 	'  <button id="butt" />' +
	// 	'</div>';

	const domButton = document.querySelector('#butt');
	// domButton.innerHTML = "<h1>Привет!</h1>";
	console.log('HTML domButton: ', domButton);
	const ev = domButton.click();
	// const ev = new Event('click', { bubbles: true });
	console.log('E: ', domButton.click());
	expect(domButton.click()).toBe('button')

});


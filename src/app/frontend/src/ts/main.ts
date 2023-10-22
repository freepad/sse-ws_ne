

const { addLogin } = require('./functions/index');
const { fun: funPrefix } = require('./functions/forms/logins'); //./functions/forms/logins
const sEvent = require('./functions/serverEvent')
document.addEventListener('DOMContentLoaded', () => {
	const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
	console.log('mainb loadPage!!');
	console.log('[sEvent]: ', sEvent.myId);
	funPrefix.loadPage(sEvent.myId());
	// debugger;

	console.log('Страница загрузилась');

	(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")
	addLogin(body);
});

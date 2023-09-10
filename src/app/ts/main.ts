const { fun, addLogin } = require('./functions');
const {WSocket }=require('./websockets');





document.addEventListener('DOMContentLoaded', () => {
	fun.loadPage();

	console.log('Страница загрузилась');

	const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
	/* debugger; */
	(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")
	addLogin(body);

});

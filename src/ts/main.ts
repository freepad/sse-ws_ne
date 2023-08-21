const { forms, handlers } = require('./functions.ts');

document.addEventListener('DOMContentLoaded', () => {
	const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
	(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")

	body[0].insertAdjacentHTML("afterbegin", forms());
	document.addEventListener('mousedown', handlers.insertNewLogin);




});



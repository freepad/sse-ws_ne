const { forms, handlers } = require('./functions.ts');




document.addEventListener('DOMContentLoaded', () => {
	const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;


	body[0].insertAdjacentHTML("afterbegin", forms());
	document.addEventListener('mousedown', handlers.insertNewLogin);



});



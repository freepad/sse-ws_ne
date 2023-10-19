
<<<<<<< HEAD
const { addLogin } = require('./functions/index.ts');
const { fun } = require('./functions/forms/logins');
=======
const { addLogin } = require('./functions/index');
const { fun } = require('./functions/forms/logins');

>>>>>>> v4.6
document.addEventListener('DOMContentLoaded', () => {
	const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
	console.log('mainb loadPage!!')
	fun.loadPage();
<<<<<<< HEAD
=======
	// debugger;

>>>>>>> v4.6
	console.log('Страница загрузилась');

	(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")
	addLogin(body);
<<<<<<< HEAD
=======

>>>>>>> v4.6
});

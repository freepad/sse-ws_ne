/**
 * i want would  be to has only  a page with Events
 */
const { handlers } = require('./functions.ts');

try {
	// const socket = new WebSocket(`ws://localhost:${port}/ws`);
	const socket = new WebSocket(`ws://localhost:7070/ws`);

	/***
	 * TODO: Only changing a user's browser. It's online or not/
	 *  The start
	 */
	window.addEventListener('offline', (e) => {
		// debugger;
		console.warn("Note: User's browser id ofline now!")
		// если оффлай - удалить пользователя
	})
	// debugger
	window.addEventListener('online', (e) => {
		if (navigator.onLine) {
			console.log("online");

		}
		// debugger
		console.log("Note: We having an online!")
	})
	/* It's online or not - finished */

	document.addEventListener('DOMContentLoaded', () => {
		console.log('Events DOMContentLoaded');
		const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
		handlers.EventUsersLoads(body);
		(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")

		body[0].insertAdjacentHTML("afterbegin", handlers.forms());
		document.addEventListener('mousedown', handlers.insertNewLogin);

	});

	socket.onopen = function () {
		console.log("Соединение установлено.");
	};

	socket.onclose = function (event) {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
			console.log(event);
		} else {
			console.log('Обрыв соединения'); // например, "убит" процесс сервера
			console.log(event);
		}
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
	};

	socket.onmessage = function (event) {
		console.log("Получены данные " + event.data);
	// socket.send("Привет");
};

socket.onerror = function (error: any) {
	console.log("Ошибка " + error.message);
};


}
catch (e) {
	console.warn('WebSocket has ERR: ', e);
	console.warn('page the main.ts');
}

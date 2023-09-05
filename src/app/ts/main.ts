/**
 * i want would  be to has only  a page with Events
 */
const { handlers } = require('./functions.ts');
const { UsersNetwork } = require('./chating/users');
let newPerson = null;
let eventSource: any = null;
let userNewInd = '';
try {
	const socket = new WebSocket(`ws://localhost:7070/ws`);
	if (window.EventSource) {
		// Internet Explorer or olds browsers
		eventSource = new EventSource('http://localhost:7070/sse');
	}
	else console.warn("Ваш браузер не поддерживает EventSource.");

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
			console.log('Обрыв соединения');
			console.log(event);
		}
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
	};

	socket.onmessage = function (event) { console.log("Получены данные " + event.data) };
	socket.onerror = function (error: any) { console.log("Ошибка " + error.message) };

	/**
	 * Events from 'EventSource' is below - start
	 */

	if (eventSource !== null) {

		eventSource.addEventListener('open', (e: any) => { console.log('Open the EventSource!', 'withCredentials: ', eventSource.withCredentials) });
		eventSource.addEventListener('error', (e: any) => console.log('Error in the EventSource: ', e));
		eventSource.addEventListener('message', (e: any) => {
			// debugger;
			const { ...datas } = JSON.parse(e.data);
			// debugger;
			console.log('Message from EventSource: ', datas);
			newPerson = new UsersNetwork(datas.login);
			/**
			 * Code below assign a new proporties, for a new object/user
			 * Start proporties.
			 */
			newPerson.addId = datas.ind;
			newPerson.onOrOfLine = true;
			newPerson.addPropertiesUser;
			/** The end proporties */

			const chattalks = document.querySelector('.accaunts') as HTMLElement;
			console.log('test 01')
			// newPerson.addOneUser = 'you';
			chattalks.insertAdjacentElement('beforeend', newPerson.addOneUser);
			userNewInd = newPerson.addId;
			// debugger;
			// }

		});
	}
}
/* Events from 'EventSource' is above - finished */
catch (e) {
	console.warn('WebSocket has ERR: ', e);
	console.warn('page the main.ts');
}



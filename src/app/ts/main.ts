const { handlers } = require('./functions.ts');
const { v4 } = require('uuid');
const socket = new WebSocket('ws://localhost:7070/ws')

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




const { fun } = require('./functions');




// try {
// wsserver.onopen = function () {
// 	alert("Соединение установлено.");
// };

document.addEventListener('DOMContentLoaded', () => {
	/*------------------*/
	const wsConnection = new WebSocket("ws://localhost:7070");
	// const wsserver = new WebSocket("ws://localhost:7070");
	console.log('Страница загрузилась');
	const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
	(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")
	body[0].insertAdjacentHTML("afterbegin", fun.forms());

	const formIdentification = body[0].querySelector('.author') as HTMLFormElement;
	const input = body[0].querySelector('input') as HTMLInputElement;
	console.log("Получили форму для регистрации New Login!");

	window.addEventListener('offline', (e: any) => {
		console.warn("Note: User's browser id ofline now!");
	});


	let resultOfFormIdentification = '';
	formIdentification.addEventListener('keypress', async (e: any) => {
		if (((e as KeyboardEvent).key === 'Enter')) {
			// e.preventDefault();
			sendToServe(e);
			input.value = '';
		}

	});

	formIdentification.addEventListener('click', async (e: any) => {
		if (((e as MouseEvent).target as HTMLButtonElement).type === 'submit') {
			sendToServe(e);

			input.value = '';
		}
	});
	function sendToServe(e: any) {
		e.preventDefault();

		if (input.value.length < 1) { console.log('Длина INPUT = 0:', input.value.length); return }
		console.log('SUBMIT'),
			console.log('Прослушка -  получили событие Inpuut из формы New-Login');
		resultOfFormIdentification = JSON.stringify(fun.author(e));
		// if (resultOfFormIdentification === '{"newLogin":""}')
		// wsSend(resultOfFormIdentification);
		wsConnection.send(JSON.stringify(resultOfFormIdentification));
		// function tutu() {



	}

	// function wsSend(elem: string) {

	// function tutu() {
	wsConnection.onopen = function () {
		console.log("Соединение установлено.");
		// debugger;

	};
	wsConnection.addEventListener('message', function (m: any) {
		console.log("Соединение установлено.", m.data);
		debugger;

	});
	// wsConnection.onclose = function (event: any) {
	// 	if (event.wasClean) {
	// 		console.log('Соединение закрыто чисто');
	// 	} else {
	// 		console.log('Обрыв соединения'); // например, "убит" процесс сервера
	// 	}
	// 	console.log('Код: ' + event.code + ' причина: ' + event.reason);
	// };

	wsConnection.onerror = function (error: any) {
		console.log("Ошибка " + error.message);
	};
	// }

});


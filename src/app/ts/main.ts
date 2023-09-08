

const { fun } = require('./functions');

try {
	const wsserver = new WebSocket("ws://localhost:7070");
// wsserver.onopen = function () {
// 	alert("Соединение установлено.");
// };

	document.addEventListener('DOMContentLoaded', () => {
		console.log('Страница загрузилась');
		const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
		(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")
		body[0].insertAdjacentHTML("afterbegin", fun.forms());

		const formIdentification = body[0].querySelector('.author') as HTMLFormElement;
		const input = body[0].querySelector('input') as HTMLInputElement;
		console.log("Получили форму для регистрации New Login!");
		// const result = fun.author();
		// console.log('Отправляем: ', result);

		window.addEventListener('offline', (e: any) => {
			console.warn("Note: User's browser id ofline now!");
		});



		// formIdentification.
		let resultOfFormIdentification = '';
		formIdentification.addEventListener('keypress', async (e: any) => {
			if (((e as KeyboardEvent).key === 'Enter')) {
				e.preventDefault();
				sendToServe(e);
			}

	});

		formIdentification.addEventListener('click', async (e: any) => {
			if (((e as MouseEvent).target as HTMLButtonElement).type === 'submit') {
				sendToServe(e);
			}
			return
		});

		function sendToServe(e: any) {
			e.preventDefault();

			if (input.value.length < 1) { console.log('Длина INPUT = 0:', input.value.length); return }
			console.log('SUBMIT'),
				console.log('Прослушка -  получили событие Inpuut из формы New-Login');
			resultOfFormIdentification = JSON.stringify(fun.author(e));
			if (resultOfFormIdentification === '{"newLogin":""}') return
			console.log('test 01: ', resultOfFormIdentification);
		// debugger;
			console.log('New-Login отправлено!');

			wsserver.onopen = (ctx: any) => {

				ctx.send(JSON.stringify(resultOfFormIdentification));
				console.log('Соединение WS установлено.')
			};

			wsserver.onclose = (e: any) => {
				if (e.wasClean) {
					console.warn('Соединение WS закрыто чисто');
				}
				else {
					console.error('Обрыв WS соединения')
					console.log(e);
				}
			}
		}
		input.value = '';


		// });
		// wsserver.addEventListener('connection', (ws: any) => {
		// wsserver.onopen = (ctx: any) => {

		// 	ctx.send(JSON.stringify(resultOfFormIdentification));
		// 	console.log('Соединение WS установлено.')
		// };
		// 	ws.onmessage = (e: any) => {
		// 		console.warn('Получены WS данные:', e.data)

		// 		console.log('Код: ' + e.code + ' причина: ' + e.reason);
		// 	};
		// ws.onclose = (e: any) => {
		// 	if (e.wasClean) {
		// 		console.warn('Соединение WS закрыто чисто');
		// 		}
		// 		else {
		// 			console.error('Обрыв WS соединения')
		// 			console.log(e);
		// 		}
		// 	}
		// });

		/*---------------*/
		// const myWs = new WebSocket('ws://localhost:9000');
		// обработчик проинформирует в консоль когда соединение установится
		// myWs.onopen = function () {
		// 	console.log('подключился');
		// };
		// обработчик сообщений от сервера
		// myWs.onmessage = function (message) {
		// 	console.log('Message: %s', message.data);
		// };
		// функция для отправки echo-сообщений на сервер
		// function wsSendEcho(value) {
		// 	myWs.send(JSON.stringify({ action: 'ECHO', data: value.toString() }));
		// }
		// функция для отправки команды ping на сервер
		// function wsSendPing() {
		// 	myWs.send(JSON.stringify({ action: 'PING' }));
		// }
		// document.querySelector('button').addEventListener('click', _ => {
		// 	const v = document.querySelector('input').value
		// 	wsSendEcho(v)
	});


	// const myWs = new WebSocket('wss://localhost:7070');
	// обработчик проинформирует в консоль когда соединение установится
	// myWs.onopen = function () {
	// 	console.log('подключился');
	// };
	// // обработчик сообщений от сервера
	// myWs.onmessage = function (message: any) {
	// 	console.log('Message: %s', message.data);
	// };
	// // функция для отправки echo-сообщений на сервер
	// function wsSendEcho(value: any) {
	// 	myWs.send(JSON.stringify({ action: 'ECHO', data: value.toString() }));
	// }
	// // функция для отправки команды ping на сервер
	// function wsSendPing() {
	// 	myWs.send(JSON.stringify({ action: 'PING' }));
	// }
}
catch (err) {
	console.error('На стороне клиента ошибка:', err);
}

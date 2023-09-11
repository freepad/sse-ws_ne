/**
 * Класс для работы с "WebSocket" протоколом.
 * Запускает прослушку событий:
 * - 'open';
 * - 'message';
 * -'close'.
 *  Каждое событие запускает фукцию по умолчанию.
 * Каждую функцию можно переписать под свои условия.
 *
 *  Есть фунция зкрытия соединения.
 *  Она возвращает соманду - закрыть соединение.
 */
export class WSocket {
	socket: any;
	handlers: any;
	constructor(url: string) {
		this.socket = new WebSocket(url);
		// debugger;

		this.socket.addEventListener('open', (e: any) => {
			console
			this.onOpen();
		});

		this.socket.addEventListener('message', (e: any) => {
			this.onMessage(e);
		});

		this.socket.addEventListener('close', (e: any) => {

			if (e.wasClean) {
				console.log('WebSocket connection closed clean!');
			}
			else {
				console.log('WebSocket connection closed aborted!');
			}
		});

		this.socket.addEventListener('error', (e: any) => {
			this.onError(e);
		});


		this.handlers = {
			open: [],

			close: [],
			data: []
		};
	}

	onOpen() {
		console.log('WebSocket connection opened!');
		if (this.handlers.data.length > 0) {
			this.socket.send(this.handlers.data[0]);
			this.handlers.data = [];
		} else {
			/**
			 * Если БД пустая
			 */
			console.error('Not datas for a Sehding');
		}
	};

	onMessage = (e: any) => {
		console.log('WebSocket Received message: ', e.data);
	};

	onClose() {
		return this.socket.close();
	};

	onError(e: any) {
		console.log('WebSocket error: ', e);
	}

	sends(datas: string) {
		console.log('DataSend!');
		this.handlers.data.push(datas);
	};


}



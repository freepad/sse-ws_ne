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
	// url: string;
	constructor(url: string) {
		this.socket = new WebSocket(url);
		this.socket.addEventListener('open', (e: any) => { console.log('OPEN') });
		this.socket.addEventListener('message', (e: any) => {
			console.log("WS message-URL: ", e.target.url, e.code);

			this.onMessage(e);
		});
		this.socket.addEventListener('close', (e: any) => {
			if (e.wasClean) { console.log('WebSocket connection closed clean!') }
			else { console.log('WebSocket connection closed aborted!') };
			console.log('WS closed Event: ', e['message']);

		});
		this.socket.addEventListener('error', (e: any) => { });

		this.handlers = {
			open: [],
			close: [],
			data: []
		};
	}

	sends(datas: string) { this.handlers.data.push(datas) };
	onOpen() {
		let data: string = '';
		if (this.handlers.data.length > 0) {
			data = this.handlers.data[0];
			// debugger
			if (this.readyState === 1) {
				console.log('WebSocket connection opened!');
				this.socket.send(data);
				this.handlers.data.pop();
				return
			} else setTimeout(() => this.onOpen(), 1000);
		}
		else if (this.readyState > 1) {
			data = this.handlers.data[0];
			this.socket.send(data);
			this.handlers.data.pop();
		}
		else {
			console.error('Not datas for a Sehding');
			this.handlers.data.pop();
		}
	};

	get readyState() { return this.socket.readyState }
	onMessage = (e: any) => { console.log('WebSocket Received message: ', e.data) };
	onClose() { return this.socket.close() };
	closing = (e: any) => { console.log('here is your handler'); };
	onError(e: any) { console.log('WebSocket error: ', e) };
}

// WebSocets

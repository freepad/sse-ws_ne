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
		this.socket.addEventListener('open', (e: any) => { /*this.onOpen()*/  console.log('OPEN') });
		this.socket.addEventListener('message', (e: any) => { this.onMessage(e); });
		this.socket.addEventListener('close', (e: any) => {
			if (e.wasClean) { console.log('WebSocket connection closed clean!') }
			else { console.log('WebSocket connection closed aborted!') };
		});
		this.socket.addEventListener('error', (e: any) => { this.onError(e) });

		this.handlers = {
			open: [],
			close: [],
			data: []
		};
	}

	sends(datas: string) {
		console.log('DataSend!');
		// this.socket.addEventListener('open', (e: any) => this.onOpen());
		this.handlers.data.push(datas);
		return
	};

	onOpen() {

		if (this.handlers.data.length > 0) {
			const data = this.handlers.data[0];
			// debugger
			const send = this.socket.send;
			// this.waiteForConnection(
			// 	send,
			// 	data,
			// 	1000
			// );
			if (this.readyState === 1) {
				console.log('WebSocket connection opened!');
				send(data);
				this.handlers.data = [];
			} else {
				setTimeout(() => this.onOpen(), 1000);

			}
		} else {
			console.error('Not datas for a Sehding');
			this.handlers.data = [];
		}
		// this.socket.removeEventListener('open', (e: any) => this.onOpen());
	};
	get readyState() {
		return this.socket.readyState
	}

	onMessage = (e: any) => { console.log('WebSocket Received message: ', e.data) };
	onClose() { return this.socket.close() };
	onError(e: any) { console.log('WebSocket error: ', e) };
}

// WebSocets

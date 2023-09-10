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
			console.log('onMESSAGE: ', this.onMessage);
			this.onMessage(e);
		});

		this.socket.addEventListener('close', (e: any) => {
			this.onClose(e);
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
			console.error('Not datas for a Sehding');
		}
	};

	onMessage = (e: any) => {
		console.log('WebSocket Received message: ', e.data);

	};

	onClose(e: any) {

		if (e.wasClean) {
			console.log('WebSocket connection closed clean!');
		}
		else {
			console.log('WebSocket connection closed aborted!');
		}
	};

	onError(e: any) {
		console.log('WebSocket error: ', e);
	}

	sends(data: string) {
		console.log('DataSend!');
		this.handlers.data.push(data);
	};

	// getMessage(){

}



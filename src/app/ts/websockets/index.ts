export class WSocket {
	socket: any;
	constructor(url: string) {
		this.socket = new WebSocket(url);
		this.socket.addEventListener('open', (e: any) => {
			this.onOpen(e);
		});

		this.socket.addEventListener('message', (e: any) => {
			this.onMessage(e);
		});

		this.socket.addEventListener('close', (e: any) => {
			this.onClose(e);
		});

		this.socket.addEventListener('error', (e: any) => {
			this.onError(e);
		});
	}

	onOpen(e: any) {
		console.log('WebSocket connection opened!');
	};

	onMessage(e: any) {
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

	send(data: string) {
		console.log('DataSend!');
		this.socket.send(data);
	};

}

const http = require('http');
let bufer = [];

const server = http.createServer();

// Listen to the request event
server.on('request', (req, res) => {
	req.on('connect', (head) => console.log('HeadOfConnestReq: ', head));
	// console.log('Req:', req);
	console.log('headReq_: ', req);
	if (!res) {
		console.log('RequestResponseError: ', res);
		return
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });

	res.end(JSON.stringify({
		data: 'Hello World!',
	}));

});

server.on('error', (err) => console.log('ServerError: ', err.message));
server.on('close', () => console.log('Close: Stops the server from accepting new connections.'));
server.listen(7070, (err) => {
	if (err) {
		console.log('Listener Error: ', err.message);
		return
	}
	console.log('Server is starting listen');
});

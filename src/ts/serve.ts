const http = require('http');
const controller = new AbortController();
// Create a local server to receive data from
var server = http.createServer();
const port = 9000;

server.on('request', (req, res) => {
	res.end('-TEST-');
});

server.on('error', (err) => {
	console.log('error: ' + err);
	controller.abort();
});

server.on('listening', function () {
	console.log('ok, server is running');
	return
});

server.on('connection', (item) => console.log('connection: ' + item));

server.listen({
	port: 7070,
	signal: controller.signal,
});


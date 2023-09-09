

const http = require('http'),
	Koa = require('koa'),
	json = require('koa-json'),
	cors = require('@koa/cors'),

	// Router = require('koa-router'),
// websockify = require('koa-websocket'),
// router = new Router(),
// app = websockify(new Koa()),
	Logger = require('koa-logger'),
	WS = require('ws'),
	{ koaBody } = require('koa-body'),
	{ v4 } = require('uuid'),
	db = require('./db'),
	app = new Koa();

const server = http.createServer(app.callback);
const webSocketServer = new WS.Server({ server });
let newClient = {};
webSocketServer.on('connection', (ws: any) => {
	ws.on('message', (m: any) => {
		console.log('SERVER_: ', typeof JSON.parse(JSON.parse(m)), JSON.parse(JSON.parse(m)));
		const message = JSON.parse(JSON.parse(m));
		const result = db.logins.find((elem: any) => elem['login'] === message['newLogin']);
		console.log('RESULT: ', result);
		if (result === undefined) {
			newClient = { login: message['newLogin'], id: makeUniqueId(v4()) };
			db.logins.push(newClient);
			// webSocketServer.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));


			console.log('TYU: ', JSON.stringify(newClient))
			const tyu = JSON.stringify(newClient);
			ws.send(tyu);
		};
	});


	// if (JSON.stringify(newClient) !== '{}') {
	// }

	ws.on("error", (e: any) => ws.send(e));

	// ws.send('Hi there, I am a WebSocket server');
});
server.listen(7070, () => console.log("Server started"));



// app
// 	.use(router.routes())
// 	.use(router.allowedMethods());





function makeUniqueId(str: string) {
	const respons = db.logins.some((item: any) => { if (item.id === str) str });
	if (respons) makeUniqueId(str);
	return str;
}


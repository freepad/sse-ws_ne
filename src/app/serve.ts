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
webSocketServer.on('connection', (ws: any) => {
	ws.on('message', (m: any) => {
		console.log('SERVER_: ', JSON.parse(m));
		webSocketServer.clients.forEach((client: any) => client.send(m));
	});

	ws.on("error", (e: any) => ws.send(e));

	ws.send('Hi there, I am a WebSocket server');
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


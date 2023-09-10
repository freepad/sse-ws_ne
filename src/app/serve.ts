const http = require('http'),
	Koa = require('koa'),
	json = require('koa-json'),
	cors = require('@koa/cors'),

	// Router = require('koa-router'),
// router = new Router(),
	Logger = require('koa-logger'),
	WS = require('ws'),
	{ koaBody } = require('koa-body'),
	{ v4 } = require('uuid'),
	db = require('./db'),
	app = new Koa();
const server = http.createServer(app.callback);
const wss = new WS.Server({ server });
let newClient = {};


wss.on('connection', (ws: any, req: any) => {
	ws.on('message', (m: any) => {
	
		/* console.log('SERVER_: ', typeof JSON.parse(JSON.parse(m)), JSON.parse(JSON.parse(m))); */
		if (req.url === '/login') {
		console.log(`WebSocket req: ${req.url}`);
		const message = JSON.parse(JSON.parse(m));
		const result = db.logins.find((elem: any) => elem['login'] === message['newLogin']);
		console.log('RESULT: ', result);
		if (result === undefined) {
			newClient = { login: message['newLogin'], id: makeUniqueId(v4()) };
			db.logins.push(newClient);
			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		}
		else{
			newClient = {};
			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		};
		}
		else if (req.url === '/') {
			console.log(`WebSocket req: ${req.url}`);
			// отправка логинов при загрузке страницы.
			const logins = JSON.stringify({ users: db.logins });
			console.log('send logins: ', logins);
			ws.send(logins);
		}
	});
	ws.on("error", (e: any) => ws.send(e));
});

server.listen(7070, () => console.log("Server started"));

function makeUniqueId(str: string) {
	const respons = db.logins.some((item: any) => { if (item.id === str) str });
	if (respons) makeUniqueId(str);
	return str;
}


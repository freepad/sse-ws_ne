const http = require('http'),
	Koa = require('koa'),
	json = require('koa-json'),
	cors = require('@koa/cors'),
	// Router = require('koa-router'),
	Logger = require('koa-logger'),
	WS = require('ws'),
	{ koaBody } = require('koa-body'),
	{ v4 } = require('uuid'),
	db = require('./db'),
	// websockify = require('koa-websocket'),
	// router = new Router(),
	// app = websockify(new Koa());
	app = new Koa();
// server = http.createServer(app.callback(), (req, res) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7071'); // Замените 'http://example.com' на домен вашего клиента
// 	res.setHeader('Access-Control-Allow-Credentials', 'true');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

// 	// ... остальной код серверной логики ...
// }),.


// app.use((ctx: any, next: any) => {
// 	const origin = ctx.request.get('Origin');
// 	if (!origin) {
// 		return next();
// 	}

// 	const headers = { 'Access-Control-Allow-Origin': '*', };

// 	if (ctx.request.method !== 'OPTIONS') {
// 		ctx.response.set({ ...headers });
// 		try {
// 			return next();
// 		} catch (e: any) {
// 			e.headers = { ...e.headers, ...headers };
// 			throw e;
// 		}
// 		}

// 	if (ctx.request.get('Access-Control-Request-Method')) {
// 		ctx.response.set({
// 			...headers,
// 			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
// 		});

// 		if (ctx.request.get('Access-Control-Request-Headers')) {
// 			ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
// 		}

// 		ctx.response.status = 204;
// 	}
// });

// let connections: any[] = [];
// app
// 	.use(cors({
// 		'Access-Control-Allow-Origin': '*',
// 		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
// 		'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
// 	}))
// 	.use(json());
// app.use(Logger());
const server = http.createServer(app.callback());

const webSocketServer = new WS.Server({ server });

webSocketServer.on('connection', (ws: any) => {
	ws.on('message', (m: any) => {
		webSocketServer.clients.forEach((client: any) => client.send(m));
		console.log('server MESSAGE: ', m);
	});

	ws.on("error", (e: any) => ws.send(e));

	ws.send('Hi there, I am a WebSocket server');
})

// app
// 	.use(router.routes())
// 	.use(router.allowedMethods());

const port = process.env.PORT || 7070;
app.listen(7070, (err: any) => {
	if (err) {
		console.error('Port, we gets Err: ', err);
		return
	}
	console.warn('Server started on localhost:', port);
});


// function makeUniqueId(str: string) {
// 	const respons = db.logins.some((item: any) => { if (item.id === str) str });
// 	if (respons) makeUniqueId(str);
// 	return str;
// }

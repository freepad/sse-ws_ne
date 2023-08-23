const path = require('path');
const http = require('http');
const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');

const WS = require('ws');
const { koaBody } = require('koa-body');

const app = new Koa();
const router = new Router();
app
	.use(json());


router.get('/');
router.post('/', koaBody({ urlencoded: true, }), (ctx: any) => {
	console.log('ROUTER request POST');
	const body = JSON.parse(ctx.request.body);
	console.log(body);
	ctx.response.body = { status: "OKs" }
	// console.log(ctx);

	ctx.response.set('Access-Control-Allow-Origin', '*');
	ctx.response.set('Access-Control-Allow-Headers', 'POST');

});



app
	.use(router.routes()).use(router.allowedMethods());


const server = http.createServer(app.callback())
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws: any) => {

	ws.send('Hello Ws connection')
});



wsServer.on('opent', (ws: any) => {

	ws.send('Hello Ws OPEN')
});

wsServer.on('close', (ws: any) => {
	ws.send('Hello Ws CLOSE');
});

wsServer.on('error', (ws: any) => {
	ws.send('Hello Ws ERROR');
});


const port = 7070

server.listen(port, (err: any) => {
	if (err) {
		console.log('Port 7070, we gets Err: ', err);
		return

	}
	console.log('Start listens by a 7070 port')
});


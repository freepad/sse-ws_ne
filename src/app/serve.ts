const path = require('path');
const http = require('http');
const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const Logger = require('koa-logger');
const cors = require('@koa/cors')
const WS = require('ws');
const { koaBody } = require('koa-body');
const { v4 } = require('uuid');



const ind = v4();
const app = new Koa();
app.use(Logger());
const router = new Router();

let body: any = { login: '' };
let loginsList: any[] = [];
// const loginsList = new Set();
app
	.use(cors({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
	}))
	.use(json());

router.get('/', async (ctx: any) => { ctx.response.body = { 'Logins': loginsList } });

router.post('/', koaBody({ urlencoded: true }), async (ctx: any) => {
	body = ctx.request.body;
	console.log('request.POST_BODY: ', body,);
	if (!body) return


	let arrFilter = loginsList.filter((item) => { if (item['login'] === body['login']) return 1 });
	let status = arrFilter.length === 0 ? 'Ok' : 'Exist';


	if (status !== 'Exist') {
		Object(body)['ind'] = ind;
		loginsList.push(body);
		ctx.response.body = { 'status': status, 'ind': ind };
		console.log('request.SEND_BODY: ', ctx.response.body,);
		// console.log('serve', ctx.response.body)
		return
	}
	ctx.response.body = { 'status': status };
	arrFilter = [];
});

app
	.use(router.routes())
	.use(router.allowedMethods());

const server = http.createServer(app.callback())
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws: any) => ws.send('Hello Ws connection:'));
wsServer.on('opent', (ws: any) => ws.send('Hello Ws OPEN:'));
wsServer.on('close', (ws: any) => ws.send('Hello Ws CLOSE:'));
wsServer.on('error', (ws: any) => ws.send('Hello Ws ERROR:'));

const port = 7070;
server.listen(port, (err: any) => {
	if (err) {
		console.error('Port 7070, we gets Err: ', err);
		return
	}
	console.log('Start listens by a 7070 port')
});


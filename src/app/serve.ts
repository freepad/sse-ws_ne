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
const { streamEvents } = require('http-event-stream');
const participant = require('./db');


let ind = '';
const app = new Koa();
app.use(Logger());
const router = new Router();
let body: any = { login: '' };
let listId: any[] = [];
app
	.use(cors({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
	}))
	.use(json());

router.get('/', async (ctx: any) => {

	ctx.response.body = { 'Logins': participant.logins }
});
router.get('/sse', async (ctx: any) => {

	streamEvents(ctx.req, ctx.res, {
		async fetch(lastEventId: any) {
			console.log('Aborted link whith server and List a message ID wich cant sent: ', lastEventId);
			listId.push(lastEventId);
			return listId
		},
		async stream(sse: any) {
			/**
			 * sending datas to the client
			 */
			participant.listener((item: any) => {
				console.log("SSE server ITEM:", item)
				sse.sendEvent({
					data: JSON.stringify(item),
					id: v4()
				});
			});
			return () => { }
		}

	});

	ctx.respond = false
});
router.post('/chat', koaBody({ urlencoded: true }), async (ctx: any) => {
	/* получаем пользователя уже со статусом и в сети */
	body = ctx.request.body;
	console.log('BODY REQ: ', body);
	// for (let elem in Object.values(participant.logins)) {
	// console.log('Elem IN OBj:', elem)
	// console.log('LOGIN?: ', body['login'], Object.values(participant.logins));
	// console.log('LOGIN?: ', body['login'] in Object.values(participant.logins));
	// }
	// ind = body['ind'];;
	// if (body['login'] in Object.values(participant.logins)) {
	const result = participant.logins.some((item: any) => {
		console.log('TEST item 0', item);
		console.log('TEST network 1', 'network' in item);
		if (item['ind'] === body['ind'] && 'network' in item) {
			console.log('TEST chat 2', participant.chattings);
			participant.chattings.push({ ind: body['ind'], message: body['message'] });
			ctx.response.body = { 'status': 'Messaage Ok' }
		}
		else if (item['login'] === body['login']) {
			item['ind'] = body['ind'];
			item['network'] = body['network']
			participant.chattings.push({ ind: body['ind'], message: body['message'] });
			ctx.response.body = { 'status': 'Messaage Ok' }
		}
		console.log('CHATTINGS: ', participant.chattings);
	});

	console.log(" 'ind' in body: ", 'ind' in body, body);
	if (!result && 'ind' in body) {
		participant.logins['login'];
		participant.logins['ind'] = body['ind'];
		participant.logins['network'] = body['network']

		participant.chattings.push({ ind: body['ind'], message: body['message'] });
		ctx.response.body = { 'status': 'Messaage Ok' }
		console.log('CHATTINGS 2: ', participant.chattings);
	}
	else if (result) {
		ctx.response.body = { 'status': 'Messaage Ok' }
		console.log('CHATTINGS 3: ', participant.chattings);
	}
	// }
	console.log('CHATTINGS 4: ', participant.chattings);
	console.log('CHATE LEN: ', participant.chattings.length)
	ind = '';
	body = '';
})
router.post('/', koaBody({ urlencoded: true }), async (ctx: any) => {
	body = ctx.request.body;
	console.log('request.POST_BODY: ', body,);
	if (!body) return
	/**
	 * If a arrFilter has value 'Ok' it's means that this's' filter's value was founded.
	 * If 'Ok' it means a 'Login'  this's a unique.
	*/
	let arrFilter = participant.logins.filter((item: any) => { if (item['login'] === body['login']) return 1 });
	let status = arrFilter.length === 0 ? 'Ok' : 'Exist';

	console.log('TEST Status 01: ', status);

	if (status !== 'Exist') {
		ind = makeUniqueId(v4());
		console.log('TEST Status 02: ', status);
		Object(body)['ind'] = ind;
		participant.adds(body);
		ctx.response.body = { 'status': status, 'ind': ind };
		console.log('request.SEND_BODY: ', ctx.response.body,);
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

function makeUniqueId(str: string) {
	const respons = participant.logins.some((item: any) => { if (item.ind === str) str });
	if (respons) makeUniqueId(str);
	return str;
}

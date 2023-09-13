// Server

let postId = 0;
const http = require('http'),
	Koa = require('koa'),
	json = require('koa-json'),
	cors = require('@koa/cors'),

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
		let url = req.url.slice(0,);
		if (url.indexOf('/login') !== (-1)) {

			const message = JSON.parse(m);
			console.log('message: ', message);
			const result = db.logins.find((elem: any) => elem['login'] === message['newLogin']);
		if (result === undefined) {
			newClient = { login: message['newLogin'], id: makeUniqueId(v4(), db.logins) };
			db.logins.push(newClient);
		}
		else {
			newClient = {};
			};

			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		}
		else if (req.url === '/' && req.url.length === 1) {
			// отправка логинов при загрузке страницы.
			console.log('Start load the page');
			const logins = JSON.stringify({ users: db.logins });
			console.log('LOGINS: ', logins);
			ws.send(logins);
			console.log('DB logins is sended');
			console.log('/* --------------- *\\')
		}
		else if (url.indexOf('/chat') !== (-1)) {
			let onePost = JSON.parse(m);
			let newPost = {};
			const id = makePostId(postId, db.posts);;

			// need take a login name
			const login = db.logins.filter((item: any) => { if (item['id'] === onePost['id']) return item['login'] });
			onePost['login'] = login[0]['login'];

			console.log('SErver onePOST: ', onePost);
			newPost = { idPost: id, post: onePost }
			db.posts.push(newPost)
			newPost = JSON.stringify(newPost);

			// console.log(wss.clients);
			Array.from(wss.clients)
				.filter((client: any) => client.readyState === WS.OPEN)
				.forEach((client: any) => client.send(newPost));
		}
	});
	ws.on("error", (e: any) => ws.send(e));
});

server.listen(7070, () => console.log("Server started"));


/* utythfnjhs ID */
function makeUniqueId(str: string, database: any) {
	const respons = database.some((item: any) => { if (item.id === str) str });
	if (respons) makeUniqueId(str, database);
	return str;
}

function makePostId(ind: number, database: any) {
	ind++;
	const respons = database.some((item: any) => { if (item.idPost === ind - 1) ind - 1 });

	if (respons) {
		makePostId(ind, database)
	};
	postId = ind - 1;
	return ind;
}

// Server

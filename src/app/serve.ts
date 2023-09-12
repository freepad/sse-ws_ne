let postId = 0;
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
		let url = req.url.slice(0,);
		console.log('URL: ', typeof url, url)
		if (url.indexOf('/login') !== (-1)) {
		console.log(`WebSocket req: ${req.url}`);
		const message = JSON.parse(JSON.parse(m));
		const result = db.logins.find((elem: any) => elem['login'] === message['newLogin']);
		console.log('RESULT: ', result);
		if (result === undefined) {
			newClient = { login: message['newLogin'], id: makeUniqueId(v4(), db.logins) };
			db.logins.push(newClient);
			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		}
		else {
			newClient = {};
			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		};
		}
		else if (req.url === '/' && req.url.length === 1) {
			console.log(`WebSocket req: ${req.url}`);
			// отправка логинов при загрузке страницы.
			const logins = JSON.stringify({ users: db.logins });
			console.log('send logins: ', logins);
			ws.send(logins);
		}
		else if (url.indexOf('/chat') !== (-1)) {
			let onePost = JSON.parse(m);
			console.log(`WebSocket req: ${req.url}`, onePost);
			let newPost = {};
			const id = makePostId(postId, db.posts);
			console.log('POAT ID: ', id);
			// newPost['idPost'] = id;
			// newPost['post'] = post;
			newPost = { idPost: id, post: onePost }
			db.posts.push(newPost)//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			newPost = JSON.stringify(newPost);
			wss.clients.forEach((client: any) => {
				client.send(newPost);
			});

		}
	});
	ws.on("error", (e: any) => ws.send(e));
});

server.listen(7070, () => console.log("Server started"));

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

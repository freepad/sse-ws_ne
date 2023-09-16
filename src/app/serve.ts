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
let postmane: any;
let url: string = '';

wss.on('connection', (ws: any, req: any) => {
	ws.on('message', (m: any) => {
<<<<<<< HEAD

		let url = req.url.slice(0,);
		if (url.indexOf('/login') !== (-1)) {
			/** ДОБАВИТЬ ЛОГИН */
=======
		url = req.url.slice(0,);
		console.log('URL from HEADER ', url);
		ws.onclose = (e: any) => {
			const message = JSON.parse(m);
			console.log(message);
			console.log('closed db.logins BEFORE; ', db['logins']);
			if (e.code === 1001) {
				/** ЗАКРЫЛ СТРАНИЦУ */
				console.log('closed: ', e.code);
				console.log('closed MESSAGE START: ', 'Url SOURCE: ' + url);
				console.log('closed MESSAGE: ', message);
				if ('id' in message) db['logins'] = db['logins'].filter((item: any) => item['id'] !== message['id']);

				/** FILTER: Формируем новый список User-ов.
					 Кто покинул страницу - удаляется из списка */

				else { db['logins'] = db['logins'].filter((item: any) => item['login'] !== message['newLogin']); }
				// userForRemove = undefined;

				if ('id'.indexOf(String(Object.keys(message)))
					|| 'newLogin'.indexOf(String(Object.keys(message))) >= 0) {
					/** Template: {"users":[{"login":"< nickname >","id":"< index-user >"}], update:true} */
					postmane = { users: db['logins'], update: true };
					console.log('closed POSTMANE before POSTER: ', postmane);
					poster(postmane);

					console.log('closed LOGINS: ', db.logins);
				}
			}
		}

		if (url.indexOf('/login') >= 0 && url.length > 1) {
			/** ПОЛУЧИЛИ ЛОГИН */
>>>>>>> v4.2
			/**
			 * Получаем логин
			 * Присваеваем ID
			 * Рассылка по клиентам
<<<<<<< HEAD
			 * Шаблон
			 * {"users":[{"login":"Tratatuy","id":"ad42549b-14d4-43bd-941b-d79aa1e47080"}]
			 */
			const message = JSON.parse(m);
			console.log('message: ', message);
			const result = db['logins'].find((elem: any) => elem['login'] === message['newLogin']);
		if (result === undefined) {
			newClient = { login: message['newLogin'], id: makeUniqueId(v4(), db['logins']) };
			db['logins'].push(newClient);
		}
		else {
			newClient = {};
			};

			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		}
		else if (req.url === '/' && req.url.length === 1) {
			/** ЗАГРУЗКА СТРАНИЦЫ */
			// отправка логинов при загрузке страницы.
			console.log('Start load the page');
			let logins: any;

			logins = db['posts'].length > 0 ? JSON.stringify({ users: db['logins'], posts: db['posts'] }) : JSON.stringify({ users: db['logins'] });
			console.log('LOGINS: ', logins);
			ws.send(logins);
			console.log('DB logins is sended');
			console.log('/* --------------- *\\')
		}
		else if (url.indexOf('/chat') !== (-1)) {
			/** РАБОТА ЧАТА */

			let onePost = JSON.parse(m);
			let newPost = {};
			if (db['posts'].length > 100) db['posts'].pop();
			const id = makePostId(postId, db['posts']);
			postId = id;
			console.log('New post-ID: ', postId);
			// need take a login name
			/**
			 * Шаблон данных в момент загрузки страницы
			 *  {"users":[{"login":"Tratatuy","id":"ad42549b-14d4-43bd-941b-d79aa1e47080"}],
			 * 		"posts":[{"idPost":1,"post":{"message":"text-text-text","id":"ad42549b-14d4-43bd-941b-d79aa1e47080","login":"Tratatuy"}}]}
			 *  "const login = db['logins'].filter()" - В БД поступает сообщение отправленное пользователем. Задача фильтра  - найти логин автора сообщения.
			 * Логин найден и сообщение проходит рассылку .
=======
			 * Шаблон БД 'logins'
			 * {"users":[{"login":"< nickname >","id":"< index-user >"}]
			 */
			const message = JSON.parse(m);
			console.log('/Login: message: ', message);
			console.log('URL from /login', url);
			/** FILTER: Проверяется - зарегистрирован или нет. */
			const result = db['logins'].find((elem: any) => elem['login'] === message['newLogin']);
			if (result === undefined) {
				newClient = { login: message['newLogin'], id: makeUniqueId(v4(), db['logins']) };
				console.log('/Login: newClient', newClient);
				db['logins'].push(newClient);
				console.log('/Login: db[logins]', db['logins'])
				console.log('/* --------------- *\\')
				/**------------------------------------------------------- */
			}
			else newClient = {};

			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		}
		else if (url.length === 1) { //  && req.url.length === 1
			/** ЗАГРУЗКА СТРАНИЦЫ */
			// отправка логинов при загрузке страницы.
			console.log('Start load the page');
			postmane = db['posts'].length > 0 ? { users: db['logins'], posts: db['posts'] } : { users: db['logins'] };

			poster(postmane);
			/**------------------------------------------------------- */
		}
		else if (url.length > 1 && url.indexOf('/chat') !== (-1)) {
			console.log('URL from /chat', url);

			/** РАБОТА ЧАТА */
			let onePost = JSON.parse(m);
			console.log('Chat: Got the post: ', onePost)
			if (db['posts'].length > 100) db['posts'].pop();
			const id = makePostId(postId, db['posts']);
			postId = id;
			// need take a login name
			/**
			 * Templates: данные НА САЙТ
			 *  A: (for box users) - {"users":[{"login":"< nickname >","id":"< index-user >"}]} - a box users
			 *  B: (for box a list posts ) - {"posts":[
			 * 				{"idPost":1,
			 * 					"post":{"message":
			 * 							"< text-for-chat >",
			 * 							"id":"< index-user >",
			 * 							"login":"< autor-this-message >"}}]}
			 * Total view: {A, B}
			 *
			 *  Filter: "const login = db['logins'].filter()"
			 *  В БД поступает сообщение отправленное пользователем. Задача фильтра  - найти логин автора сообщения.
			 *  Логин найден и сообщение проходит рассылку .
>>>>>>> v4.2
			 */
			const login = db['logins'].filter((item: any) => { if (item['id'] === onePost['id']) return item['login'] });
			onePost['login'] = login[0]['login'];

			console.log('SErver onePOST: ', onePost);
<<<<<<< HEAD

			/**Шаблон для БД
			 * db['posts'] = [{"idPost":1,"post":{"message":"text-text-text","id":"ad42549b-14d4-43bd-941b-d79aa1e47080"ЪЪъ
			 */
			newPost = { idPost: id, post: onePost }
			db['posts'].push(newPost)
			newPost = JSON.stringify(newPost);

			Array.from(wss.clients)
				.filter((client: any) => client.readyState === WS.OPEN)
				.forEach((client: any) => client.send(newPost));
=======
			/**Шаблон НА САЙТ/БД 'posts'
			 * db['posts'] = [{"idPost":1,"post":{"message":"< text-for-chat >","id":"< index-user >"}}]
			 */
			postmane = { idPost: id, post: onePost }
			db['posts'].push(postmane);
			poster(postmane);
			/**------------------------------------------------------- */
>>>>>>> v4.2
		}
	});
	ws.on("error", (e: any) => ws.send(e));
});

server.listen(7070, () => console.log("Server started"));


/* generatos ID */
function makeUniqueId(str: string, database: any) {
	const respons = database.some((item: any) => { if (item.id === str) str });
	if (respons) makeUniqueId(str, database);
	return str;
}

function makePostId(ind: number, database: any) {
	ind++;
	const respons = database.some((item: any) => { if (item.idPost === (ind - 1)) (ind - 1) });

<<<<<<< HEAD
	if (respons) {
		makePostId((ind + 1), database)
	};
	postId = ind - 1;
	return ind;
}

// Server
=======
	if (respons) makePostId((ind + 1), database);
	postId = ind - 1;
	return ind;
}
/**
 * При вызоые отбирает клиентов которые еще в сети
 * и проводит им рассылку просто логина или логина с сообщением.
 */
function poster(elem: any) {
	console.log('URL from FOALDER', url);
	console.log('POSTMANE was TYPE: ', typeof elem);
	elem = JSON.stringify(elem);
	console.log('POSTMANE wss.CLIENTS: ', Array.from(wss.clients).length);
	Array.from(wss.clients)
		.filter((clients: any) => clients.readyState === WS.OPEN)
		.forEach((clients: any) => {

			console.log('elem: ', elem);
			clients.send(elem);

			console.log('Data sended');
			console.log('/* --------------- *\\')

		})
}

// Server
// https://discord.com/channels/@me/1067365554438017084/1151487583503790090
>>>>>>> v4.2

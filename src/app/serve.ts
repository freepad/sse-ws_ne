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

wss.on('connection', (ws: any, req: any) => {
	/***
	 * Статус ONLINE необходимо присваивать НА сервере после того как сработает CONECTION.
	 * Присваиваем статус ONLINE кдиенту.
	 *
	 * На загрузку страниц ставить фильтер ONLINE.
	 *
	 * После следим за CLOSED. Сработало, значит Обновляем список клиентов
	 */

	ws.on('message', (m: any) => {
		let url = req.url.slice(0,);
		ws.onclose = (e: any) => {
			const message = JSON.parse(m);
			console.log(message);
			if (e.code === 1001) {
				console.log('closed MESSAGE START: ', 'Url: ' + url);
				if ('id' in message) db.logins = db.logins.filter((item: any) => item['id'] !== message['id'])
				else db.logins = db.logins.filter((item: any) => item['login'] !== message['newLogin']);
				postmane = { users: db.logins };
				loginPoster(postmane);

				console.log('closed MESSAGE: ', message, req.url);
				console.log('closed LOGINS: ', db.logins);
			}
		}

		if (url.indexOf('/login') >= 0 && url.length > 1) {
			/** ДОБАВИТЬ ЛОГИН */
			/**
			 * Получаем логин
			 * Присваеваем ID
			 * Рассылка по клиентам
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
			else newClient = {};

			wss.clients.forEach((client: any) => client.send(JSON.stringify(newClient)));
		}
		else if (url.length === 1) { //  && req.url.length === 1
			/** ЗАГРУЗКА СТРАНИЦЫ */
			// отправка логинов при загрузке страницы.
			console.log('Start load the page');
			postmane = db['posts'].length > 0 ? { users: db['logins'], posts: db['posts'] } : { users: db['logins'] };

			loginPoster(postmane);
			/**------------------------------------------------------- */
		}
		else if (url.length > 1 && url.indexOf('/chat') !== (-1)) {
			/** РАБОТА ЧАТА */
			let onePost = JSON.parse(m);
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
			 */
			const login = db['logins'].filter((item: any) => { if (item['id'] === onePost['id']) return item['login'] });
			onePost['login'] = login[0]['login'];

			console.log('SErver onePOST: ', onePost);

			/**Шаблон для БД
			 * db['posts'] = [{"idPost":1,"post":{"message":"text-text-text","id":"ad42549b-14d4-43bd-941b-d79aa1e47080"}}]
			 */

			postmane = { idPost: id, post: onePost }
			db['posts'].push(postmane);
			loginPoster(postmane);
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

	if (respons) makePostId((ind + 1), database);
	postId = ind - 1;
	return ind;
}
/**
 * При вызоые отбирает клиентов которые еще в сети
 * и проводит им рассылку просто логина или логина с сообщением.
 */
function loginPoster(elem: any) {
	console.log('POSTMANE was TYPE: ', typeof elem);
	elem = JSON.stringify(elem);

	Array.from(wss.clients)
		.filter((clients: any) => clients.readyState === WS.OPEN)
		.forEach((clients: any) => {

			console.log('elem: ', elem);
			clients.send(elem);

			console.log('DB logins is sended');
			console.log('/* --------------- *\\')

		})
}

// Server
// https://discord.com/channels/@me/1067365554438017084/1151487583503790090

// Server
var postId = 0;
var http = require('http'), Koa = require('koa'), json = require('koa-json'), cors = require('@koa/cors'), Logger = require('koa-logger'), WS = require('ws'), koaBody = require('koa-body').koaBody, v4 = require('uuid').v4, db = require('../../../db'), app = new Koa();
var server = http.createServer(app.callback);
var wss = new WS.Server({ server: server });
var newClient = {};
var postmane;
var url = '';
wss.on('connection', function (ws, req) {
    ws.on('message', function (m) {
        url = req.url.slice(0);
        console.log('URL from HEADER ', url);
        ws.onclose = function (e) {
            var message = JSON.parse(m);
            console.log(message);
            console.log('closed db.logins BEFORE; ', db['logins']);
            if (e.code === 1001) {
                /** ЗАКРЫЛ СТРАНИЦУ */
                console.log('closed: ', e.code);
                console.log('closed MESSAGE START: ', 'Url SOURCE: ' + url);
                console.log('closed MESSAGE: ', message);
                if ('id' in message)
                    db['logins'] = db['logins'].filter(function (item) { return item['id'] !== message['id']; });
                /** FILTER: Формируем новый список User-ов.
                     Кто покинул страницу - удаляется из списка */
                else {
                    db['logins'] = db['logins'].filter(function (item) { return item['login'] !== message['newLogin']; });
                }
                // userForRemove = undefined;
                if ('id'.indexOf(String(Object.keys(message)))
                    || 'newLogin'.indexOf(String(Object.keys(message))) >= 0) {
                    /** Template: {"users":[{"login":"< nickname >","id":"<
                     * -user >"}], update:true} */
                    postmane = { users: db['logins'], update: true };
                    console.log('closed POSTMANE before POSTER: ', postmane);
                    poster(postmane);
                    console.log('closed LOGINS: ', db.logins);
                }
            }
        };
        if (url.indexOf('/login') >= 0 && url.length > 1) {
            /** ПОЛУЧИЛИ ЛОГИН */
            /**
             * Получаем логин
             * Присваеваем ID
             * Рассылка по клиентам
             * Шаблон БД 'logins'
             * {"users":[{"login":"< nickname >","id":"<
             * -user >"}]
             */
            var message_1 = JSON.parse(m);
            console.log('/Login: message: ', message_1);
            console.log('URL from /login', url);
            /** FILTER: Проверяется - зарегистрирован или нет. */
            var result = db['logins'].find(function (elem) { return elem['login'] === message_1['newLogin']; });
            if (result === undefined) {
                newClient = { login: message_1['newLogin'], id: makeUniqueId(v4(), db['logins']) };
                console.log('/Login: newClient', newClient);
                db['logins'].push(newClient);
                console.log('/Login: db[logins]', db['logins']);
                console.log('/* --------------- *\\');
                /**------------------------------------------------------- */
            }
            else
                newClient = {};
            wss.clients.forEach(function (client) { return client.send(JSON.stringify(newClient)); });
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
            var onePost_1 = JSON.parse(m);
            console.log('Chat: Got the post: ', onePost_1);
            if (db['posts'].length > 100)
                db['posts'].pop();
            var id = makePostId(postId, db['posts']);
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
             */
            var login = db['logins'].filter(function (item) { if (item['id'] === onePost_1['id'])
                return item['login']; });
            onePost_1['login'] = login[0]['login'];
            console.log('SErver onePOST: ', onePost_1);
            /**Шаблон НА САЙТ/БД 'posts'
             * db['posts'] = [{"idPost":1,"post":{"message":"< text-for-chat >","id":"< index-user >"}}]
             */
            postmane = { idPost: id, post: onePost_1 };
            db['posts'].push(postmane);
            poster(postmane);
            /**------------------------------------------------------- */
        }
    });
    ws.on("error", function (e) { return ws.send(e); });
});
server.listen(7070, function () { return console.log("Server started"); });
/* generatos ID */
function makeUniqueId(str, database) {
    var respons = database.some(function (item) { if (item.id === str)
        str; });
    if (respons)
        makeUniqueId(str, database);
    return str;
}
function makePostId(ind, database) {
    ind++;
    var respons = database.some(function (item) { if (item.idPost === (ind - 1))
        (ind - 1); });
    if (respons)
        makePostId((ind + 1), database);
    postId = ind - 1;
    return ind;
}
/**
 * При вызоые отбирает клиентов которые еще в сети
 * и проводит им рассылку просто логина или логина с сообщением.
 */
function poster(elem) {
    console.log('URL from FOALDER', url);
    console.log('POSTMANE was TYPE: ', typeof elem);
    elem = JSON.stringify(elem);
    console.log('POSTMANE wss.CLIENTS: ', Array.from(wss.clients).length);
    Array.from(wss.clients)
        .filter(function (clients) { return clients.readyState === WS.OPEN; })
        .forEach(function (clients) {
        console.log('elem: ', elem);
        clients.send(elem);
        console.log('Data sended');
        console.log("/* --------------- *\\");
    });
}
// Server
// https://discord.com/channels/@me/1067365554438017084/1151487583503790090

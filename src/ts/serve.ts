const path = require('path');
const http = require('http');
const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const render = require('koa-ejs');
const app = new Koa();
const router = new Router();
const server = http.createServer(app.callback())

app.use(json());

render(app, {
	root: path.join(__dirname, "templates"),
	layout: 'index',
	viewExt: 'html',
	cache: false,
	debag: true
});

// app.use(async ctx => {
// 	ctx.body = { msg: 'Hello Word' };
// });
// router.get('/');
router.get('/', index);

async function index(ctx: any) {
	await ctx.render('index', {});
}
app
	.use(router.routes())
	.use(router.allowedMethods());
server.listen(7070, () => console.log('Start listens by a 7070 port'));


// Server
let postId = 0;
const http = require('http'), Koa = require('koa'), json = require('koa-json'), cors = require('@koa/cors');
const Logger = require('koa-logger');
const WS = require('ws');
const { koaBody } = require('koa-body');
const { v4 } = require('uuid');
const db = require('db/index.js');
const app = new Koa();
const server = http.createServer(app.callback);
const wss = new WS.Server({ server });
let newClient = {};
let postmane: any;
let url: string = '';
console.log('[DB-file]: ', db);
console.log('[DB-object]: ', Object(db))
console.log('[DB-object]: ', Object.keys(db))

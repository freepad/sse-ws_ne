/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.css":
/*!****************************!*\
  !*** ./src/scss/style.css ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://child-frontend-config/./src/scss/style.css?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://child-frontend-config/./src/scss/style.scss?");

/***/ }),

/***/ "./src/ts/functions/forms/logins/index.ts":
/*!************************************************!*\
  !*** ./src/ts/functions/forms/logins/index.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.fun = void 0;\n// src\\app\\frontend\\src\\ts\\functions\\forms\\logins\\index.ts\nlet newLogin = [];\nconst body = document.getElementsByTagName('body');\n;\nconst { WSocket } = __webpack_require__(/*! ../../../models/websockets */ \"./src/ts/models/websockets/index.ts\");\nconst { default: addPropertiesUser } = __webpack_require__(/*! ../../serverEvent/addPropertiesUser */ \"./src/ts/functions/serverEvent/addPropertiesUser/index.ts\");\nlet wsLoadPage;\nconst mapListUsers = new Map();\nexports.fun = {\n    forms() {\n        return `<section class=\"author\">\n\t\t<div class=\"title\">\n\t\t\t<h2>Выберите псевдоним</h2>\n\t\t</div>\n\t\t<div class=\"form\">\n\t\t\t<form action=\"\" class=\"login\" >\n\t\t\t\t<div class=\"input\">\n\t\t\t\t\t<input type=\"text\" maxlength=\"25\" value=\"\" id=\"login\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"button\">\n\t\t\t\t\t<button id=\"go\" type=\"submit\">Предложить</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</section>`;\n    },\n    idForn(event) {\n        if ((event.target.type === 'submit'\n            || event.key === 'Enter')) {\n            event.preventDefault();\n            const form = body[0].querySelector('.author');\n            const input = form.querySelector('input');\n            return { newLogin: input.value };\n        }\n    },\n    /**\n     * После того как DOM-страницы загрузался\n     * Открывает соединение на сервер.\n     * делает запрос зарегистрированных пользователей из \"/\" адреса\n     * Если есть пользователи, загружает их на страницу.\n    //  * и загрывает соединени??????????\n     */\n    loadPage(ind) {\n        /** Первичная закгрузка страницы **/\n        newLogin = [];\n        if (wsLoadPage === undefined\n            || (wsLoadPage\n                && (wsLoadPage.readyState === 0 || wsLoadPage.readyState > 1))) {\n            console.log('/ URL');\n            wsLoadPage = new WSocket(\"ws://localhost:7070/\");\n        }\n        // debugger;\n        wsLoadPage.onMessage = (e) => __awaiter(this, void 0, void 0, function* () {\n            if (e.target.url !== \"ws://localhost:7070/\")\n                return;\n            const data = JSON.parse(e.data);\n            if ('users' in data && data['users'].length < 1)\n                data;\n            let postReSort = [];\n            // debugger;\n            /** сортировка данных из db */\n            if (data['posts'] && data['posts'].length > 0) {\n                postReSort = yield Array.from(data['posts']).sort((postA, postB) => {\n                    let int = 0;\n                    int = postA['idPost'] > postB['idPost'] ? -1 : 1;\n                    return int;\n                });\n            }\n            ;\n            /* выкладываем пользователей */\n            if ('users' in data) {\n                // debugger;\n                mapListUsers.clear();\n                body[0].querySelector('.accaunts')\n                    .replaceChildren('');\n                Array.from(data['users']).forEach((elem) => {\n                    console.log('выкладываем пользователей : ', elem);\n                    mapListUsers.set(elem['id'], elem['login']);\n                    const persone = addPropertiesUser(elem);\n                    const boxContainsUser = document.querySelectorAll('.accaunts');\n                    boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', persone.addHtmlUser);\n                });\n            }\n            /** к постам из БД присваеваем логины */\n            postReSort.forEach((item) => {\n                for (let i = 0; i < data['users'].length; i++) {\n                    if (item['post']['id'].indexOf(data['users'][i]['id']) >= 0) {\n                        item['login'] = data['users'][i]['login'];\n                    }\n                }\n            });\n            /** выкладываем посты  */\n            /**Выкладываем посты в экран чата */\n            if (ind.length === 0) {\n                const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type');\n                postReSort.forEach((item) => {\n                    const user = item['login'];\n                    const post = item['post']['message'];\n                    sqreenChat.insertAdjacentHTML('afterbegin', `<div class=\"post\">\n\t\t\t\t\t\t<div class=\"post-accaunt sourcename\">${user}</div>\n\t\t\t\t\t\t<div class=\"date\">01:25 20.03.2019</div>\n\t\t\t\t\t\t<div class=\"text\">${post} </div>\n\t\t\t\t\t</div>`);\n                });\n                postReSort = [];\n            }\n            return data;\n        });\n        const request = JSON.stringify({ users: [] });\n        wsLoadPage.sends(request);\n        wsLoadPage.onOpen();\n    }\n};\n// function / forms\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/functions/forms/logins/index.ts?");

/***/ }),

/***/ "./src/ts/functions/index.ts":
/*!***********************************!*\
  !*** ./src/ts/functions/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n// src\\app\\frontend\\src\\ts\\functions\\index.ts\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getNewPost = exports.addLogin = void 0;\nconst body = document.getElementsByTagName('body');\n// const { sentNewLogin, myId } = require('./serverEvent');\nconst se = __webpack_require__(/*! ./serverEvent */ \"./src/ts/functions/serverEvent/index.ts\");\nconst { default: sentNewLogin } = __webpack_require__(/*! ./serverEvent/sentNewLogin */ \"./src/ts/functions/serverEvent/sentNewLogin/index.ts\");\nconst { fun } = __webpack_require__(/*! ./forms/logins */ \"./src/ts/functions/forms/logins/index.ts\");\n/* it for events by indentifikation a new Login - start*/\n/**\n * РЕГИСТРАЦИЯ ЛОГИНА event\n * @param elem: HTMLElement формы для ридентификации\n * Запускает прослешку событий на нажетие\n *  - клавиши \"Enter\"\n *  - click по \"subnite\"\n *\n * События вызывыют под-функцию \"sentNewLogin\".\n * \"sentNewLogin\" Отправляет имя нового логина на сервер.\n */\nfunction addLogin(elem) {\n    elem[0].insertAdjacentHTML(\"afterbegin\", fun.forms());\n    const formIdentification = body[0].querySelector('.author');\n    formIdentification.addEventListener('keypress', (e) => {\n        if (e.key === 'Enter') {\n            console.log('[SE Enter]: ', sentNewLogin);\n            sentNewLogin(e)\n                .then(() => { addUserStyle(); });\n        }\n        ;\n    });\n    formIdentification.addEventListener('click', (e) => {\n        if (e.target.type === 'submit') {\n            console.log('[SE submit]: ', sentNewLogin);\n            sentNewLogin(e)\n                .then(() => { addUserStyle(); });\n        }\n        ;\n    });\n}\nexports.addLogin = addLogin;\n/**\n * Обновляем внешний вид логина в колонке чата.\n */\nfunction addUserStyle() {\n    let user = [];\n    const users = document.querySelectorAll('.accaunt__online_one');\n    user = Array.from(users).filter((elem) => { if (elem.className.includes('imNew'))\n        return elem; });\n    if (user.length > 0) {\n        user[0].classList.remove('imNew');\n        user[0].classList.add('you');\n        return;\n    }\n    setTimeout(() => addUserStyle(), 1000);\n}\nconst sqreenChat = body[0].querySelector('.chattalks > div:first-of-type');\nfunction getNewPost() {\n    return (e) => {\n        const data = JSON.parse(e.data);\n        if (e.target.url !== \"ws://localhost:7070/chat\"\n            || (\"idPost\" in data) === false)\n            return;\n        const post = data['post']['message'];\n        let user = data['post']['login'];\n        /**Все посты , отправленные пользователем проходят через БД. Пожьлму, получаем данные  */\n        const ImUser = document.querySelector('.you'); // Получаем id-пользователя\n        const postConyains = `</div>\n\t\t\t\t\t<div class=\"date\">01:25 20.03.2019</div>\n\t\t\t\t\t<div class=\"text\">${post}</div>\n\t\t\t\t</div>`;\n        // if ((ImUser.querySelector('div:last-of-type') as HTMLElement).hasAttribute('data-num') /* you -------- */\n        // debugger;\n        if (se.myId().length > 5 && se.myId().indexOf(data['post']['id']) >= 0) {\n            user = 'You';\n            sqreenChat.insertAdjacentHTML('beforeend', `<div class=\"post your-post\">\n\t\t\t<div class=\"post-accaunt sourcename\">${user}` + postConyains); // помечаем авторские посты\n            return;\n        }\n        sqreenChat.insertAdjacentHTML('beforeend', `<div class=\"post\">\n\t\t<div class=\"post-accaunt sourcename\">${user}` + postConyains);\n    };\n}\nexports.getNewPost = getNewPost;\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/functions/index.ts?");

/***/ }),

/***/ "./src/ts/functions/serverEvent/addPropertiesUser/index.ts":
/*!*****************************************************************!*\
  !*** ./src/ts/functions/serverEvent/addPropertiesUser/index.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst { UsersNetwork } = __webpack_require__(/*! ../../../models/users */ \"./src/ts/models/users/index.ts\");\n/**\n * На входе получаем данные из БД.\n * Объект заполняем значениями свойств.\n * @param data: Данные\n * @returns обект.\n */\nfunction default_1(data) {\n    const persone = new UsersNetwork(data['login']);\n    /* User network's status is checking ??  - start */\n    if (navigator.onLine)\n        persone.onOrOfLine = 'onLine';\n    window.addEventListener(\"offline\", (event) => {\n        persone.onOrOfLine = 'offline';\n    });\n    /* User network's status is checking  - finish */\n    persone.addId = data['id'];\n    persone.addHTMLUser;\n    /** {login: < nik-name >, network: < on or of line >, id: < index user >} */\n    return persone;\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/functions/serverEvent/addPropertiesUser/index.ts?");

/***/ }),

/***/ "./src/ts/functions/serverEvent/index.ts":
/*!***********************************************!*\
  !*** ./src/ts/functions/serverEvent/index.ts ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nconst { WSocket } = __webpack_require__(/*! ../../models/websockets */ \"./src/ts/models/websockets/index.ts\");\nconst { ChatSqreen } = __webpack_require__(/*! ../../models/chat */ \"./src/ts/models/chat/index.ts\");\nconst { default: addPropertiesUser } = __webpack_require__(/*! ./addPropertiesUser */ \"./src/ts/functions/serverEvent/addPropertiesUser/index.ts\");\nconst { fun } = __webpack_require__(/*! ../../functions/forms/logins */ \"./src/ts/functions/forms/logins/index.ts\");\nconst moduleFun = __webpack_require__(/*! ../index.ts */ \"./src/ts/functions/index.ts\");\nconsole.log('[getNewPost]: ', moduleFun);\nconst url = \"ws://localhost:7070\";\nconst body = document.getElementsByTagName('body');\nconst chatInput = body[0].querySelector('.chattalks input');\nlet wsChat;\nlet thisIsMyId = '';\n/** HANDLER\n * Данные отправленнвне на сервер, там проверка нового логина.\n * Полученные данные (логин после проверки ) - объект пользователя вставляется в левый контейнер чата.\n * @returns handler для event: 'message'\n */\nfunction getNewLogin() {\n    return (e) => {\n        var _a, _b;\n        const req = e.data;\n        if (e.target.url !== url + \"/login\")\n            return;\n        if (req.length > 2) {\n            const data = JSON.parse(e.data);\n            if ((\"login\" in data) === false)\n                return;\n            /** Template {login: < nik-name >, network: < on or of line >, id: < index user >} */\n            const boxContainsUser = document.querySelectorAll('.accaunts');\n            if (thisIsMyId.length < 5)\n                thisIsMyId = data['id'];\n            // debugger;\n            const persone_ = addPropertiesUser(data);\n            const newUser = persone_['addHtmlUser'];\n            newUser.classList.add('imNew');\n            // boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', newUser);\n            boxContainsUser[0].insertAdjacentElement('beforeend', newUser);\n            (_a = body[0].querySelector('.chattalks > div:last-of-type')) === null || _a === void 0 ? void 0 : _a.removeAttribute('style');\n            (_b = body[0].querySelector('.author')) === null || _b === void 0 ? void 0 : _b.remove();\n        }\n        else if (req.length < 3) {\n            const p = body[0].querySelector('.not');\n            if (p)\n                p.remove();\n            const input = body[0].querySelector('.author');\n            if (input) {\n                input.insertAdjacentHTML('beforeend', '<p class=\"not\" style=\"color:red;\">Пользователь уже зарегистрирован</p>');\n            }\n        }\n    };\n}\n/* it for events by indentifikation a new Login - start*/\nconst sqreenChat = body[0].querySelector('.chattalks > div:first-of-type');\nconst chat = new ChatSqreen(chatInput);\nchat.getSqreenChat = sqreenChat;\nchat.server = (elem) => {\n    const userId = myId();\n    // debugger;\n    elem['id'] = userId;\n    if (wsChat === undefined\n        || (wsChat\n            && (wsChat.readyState === 0 || wsChat.readyState > 1))) {\n        console.log('/chat URL');\n        wsChat = new WSocket(url + \"/chat\");\n    }\n    let post = JSON.stringify(elem);\n    wsChat.sends(post);\n    wsChat.onOpen();\n    wsChat.onMessage = moduleFun.getNewPost();\n    return;\n};\nfunction myId() {\n    return thisIsMyId;\n}\n// ServerEvents\nmodule.exports = { myId, getNewLogin };\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/functions/serverEvent/index.ts?");

/***/ }),

/***/ "./src/ts/functions/serverEvent/sentNewLogin/index.ts":
/*!************************************************************!*\
  !*** ./src/ts/functions/serverEvent/sentNewLogin/index.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n// src\\app\\frontend\\src\\ts\\functions\\serverEvent\\sentNewLogin\\index.ts\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst { WSocket } = __webpack_require__(/*! ../../../models/websockets */ \"./src/ts/models/websockets/index.ts\");\nconst { fun } = __webpack_require__(/*! ../../forms/logins */ \"./src/ts/functions/forms/logins/index.ts\");\nconst { getNewLogin: getNewLoginPrefix } = __webpack_require__(/*! ../index.ts */ \"./src/ts/functions/serverEvent/index.ts\");\nconst url = \"ws://localhost:7070\";\nlet ws;\nconst body = document.getElementsByTagName('body');\n/**\n         * Handler для событий из формы регистрации логина.\n     * Отправляем логин на сервер.\n     * @param e: event.\n     * @returns void\n     */\nfunction default_1(e) {\n    return __awaiter(this, void 0, void 0, function* () {\n        e.preventDefault();\n        const input = body[0].querySelector('.login input');\n        if (ws === undefined\n            || (ws\n                && (ws.readyState === 0 || ws.readyState > 1))) {\n            console.log('/login URL');\n            ws = new WSocket(url + \"/login\");\n        }\n        ws.onMessage = getNewLoginPrefix();\n        if (input.value.length < 1)\n            return;\n        /**Template: { newLogin: input.value } */\n        const resultOfFormIdentification = JSON.stringify(fun.idForn(e));\n        ws.sends(resultOfFormIdentification);\n        ws.onOpen();\n        input.value = '';\n        return;\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/functions/serverEvent/sentNewLogin/index.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("\nconst { addLogin } = __webpack_require__(/*! ./functions/index */ \"./src/ts/functions/index.ts\");\nconst { fun: funPrefix } = __webpack_require__(/*! ./functions/forms/logins */ \"./src/ts/functions/forms/logins/index.ts\"); //./functions/forms/logins\nconst sEvent = __webpack_require__(/*! ./functions/serverEvent */ \"./src/ts/functions/serverEvent/index.ts\");\ndocument.addEventListener('DOMContentLoaded', () => {\n    const body = document.getElementsByTagName('body');\n    console.log('mainb loadPage!!');\n    console.log('[sEvent]: ', sEvent.myId);\n    funPrefix.loadPage(sEvent.myId());\n    // debugger;\n    console.log('Страница загрузилась');\n    body[0].querySelector('.chattalks > div:last-of-type').setAttribute('style', \"display:none;\");\n    addLogin(body);\n});\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/main.ts?");

/***/ }),

/***/ "./src/ts/models/chat/index.ts":
/*!*************************************!*\
  !*** ./src/ts/models/chat/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ChatSqreen = void 0;\n// Chat model\nclass ChatSqreen {\n    constructor(elem) {\n        var _a, _b, _c, _d;\n        this.server = (str) => { }; // в функциях прописать сервер отправку и рассылку сообщений\n        this.messageHtml = elem;\n        /** СООБЩЕНИЕ В ЧАТ event */\n        (_d = (_c = (_b = (_a = this.messageHtml) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.addEventListener('keypress', (e) => {\n            if (e.key === 'Enter') {\n                // debugger;\n                e.preventDefault();\n                let mess = this.messageHtml.value.slice(0);\n                this.messageHtml.value = '';\n                const postOfChat = { message: mess, };\n                this.server(postOfChat);\n                mess = '';\n            }\n        });\n    }\n    ;\n    /**\n     * Получаем объект пользователя со все его свойствами.\n     *  Это альтернатива для наследования\n     */\n    set userChat(user) { this.user = user; }\n    ;\n    /*\n    * Получаем экран чата\n    */\n    set getSqreenChat(sqreenChat) { this.sqreenChat = sqreenChat; }\n    ;\n}\nexports.ChatSqreen = ChatSqreen;\n// Chat model\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/models/chat/index.ts?");

/***/ }),

/***/ "./src/ts/models/users/index.ts":
/*!**************************************!*\
  !*** ./src/ts/models/users/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {\n    if (kind === \"m\") throw new TypeError(\"Private method is not writable\");\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a setter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot write private member to an object whose class did not declare it\");\n    return (kind === \"a\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;\n};\nvar __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};\nvar _Users_ind, _UsersHtml_templateHtml;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.userChat = exports.UsersNetwork = void 0;\nclass Users {\n    constructor(newLogin) {\n        _Users_ind.set(this, void 0);\n        this.login = newLogin;\n        __classPrivateFieldSet(this, _Users_ind, '', \"f\");\n    }\n    set addId(ind) {\n        __classPrivateFieldSet(this, _Users_ind, ind, \"f\");\n    }\n    get addId() { return __classPrivateFieldGet(this, _Users_ind, \"f\"); }\n}\n_Users_ind = new WeakMap();\nclass UsersHtml extends Users {\n    constructor(newLogin) {\n        super(newLogin);\n        _UsersHtml_templateHtml.set(this, void 0);\n        this.status = false;\n        __classPrivateFieldSet(this, _UsersHtml_templateHtml, document.createElement('div'), \"f\");\n    }\n    crateUserHtml() {\n        const div = __classPrivateFieldGet(this, _UsersHtml_templateHtml, \"f\");\n        const divImg = div.cloneNode(true);\n        divImg.className = 'preview';\n        const divLogin = div.cloneNode(true);\n        divLogin.setAttribute('data-num', this.addId);\n        const img = document.createElement('img');\n        img.src = '/';\n        divImg.appendChild(img);\n        const span = document.createElement('span');\n        span.innerHTML = this.login;\n        divLogin.className = \"sourcename\";\n        divLogin.appendChild(span);\n        div.appendChild(divImg);\n        div.appendChild(divLogin);\n        div.className = `accaunt__online_one`;\n        __classPrivateFieldSet(this, _UsersHtml_templateHtml, div, \"f\");\n        // debugger\n        // return this.templateHtml;\n    }\n    get addHtmlUser() {\n        this.crateUserHtml();\n        console.log(__classPrivateFieldGet(this, _UsersHtml_templateHtml, \"f\"));\n        // debugger;\n        return __classPrivateFieldGet(this, _UsersHtml_templateHtml, \"f\");\n    }\n}\n_UsersHtml_templateHtml = new WeakMap();\nclass UsersNetwork extends UsersHtml {\n    constructor(newLogin) {\n        super(newLogin);\n        this.network = 'ofline';\n        window.addEventListener(\"offline\", (event) => {\n            // ???\n        });\n    }\n    /**\n     * @params status: if it's a 'true' means login is a unique and user has been status a online;\n     */\n    set onOrOfLine(status) {\n        if (status)\n            this.network = 'online';\n    }\n    get onOrOfLine() { return this.network; }\n    get addPropertiesUser() {\n        return {\n            login: this.login,\n            ind: this.addId,\n            network: this.onOrOfLine,\n        };\n    }\n}\nexports.UsersNetwork = UsersNetwork;\nclass userChat {\n    constructor(elem) {\n        this.messageHtml = elem;\n        /* this.user = user; */\n    }\n    onKeypress(e) {\n        this.userChat;\n        this.messageHtml.value;\n    }\n    set userChat(user) {\n        // debugger;\n        this.user = user;\n    }\n    get userChat() {\n        return this.user;\n    }\n}\nexports.userChat = userChat;\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/models/users/index.ts?");

/***/ }),

/***/ "./src/ts/models/websockets/index.ts":
/*!*******************************************!*\
  !*** ./src/ts/models/websockets/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WSocket = void 0;\n/**\n * Класс для работы с \"WebSocket\" протоколом.\n * Запускает прослушку событий:\n * - 'open';\n * - 'message';\n * -'close'.\n *  Каждое событие запускает фукцию по умолчанию.\n * Каждую функцию можно переписать под свои условия.\n *\n *  Есть фунция зкрытия соединения.\n *  Она возвращает соманду - закрыть соединение.\n */\nclass WSocket {\n    // url: string;\n    constructor(url) {\n        this.onMessage = (e) => { console.log('WebSocket Received message: ', e.data); };\n        this.closing = (e) => { console.log('here is your handler'); };\n        this.socket = new WebSocket(url);\n        this.socket.addEventListener('open', (e) => { console.log('OPEN'); });\n        this.socket.addEventListener('message', (e) => {\n            console.log(\"WS message-URL: \", e.target.url, e.code);\n            this.onMessage(e);\n        });\n        this.socket.addEventListener('close', (e) => {\n            if (e.wasClean) {\n                console.log('WebSocket connection closed clean!');\n            }\n            else {\n                console.log('WebSocket connection closed aborted!');\n            }\n            ;\n            console.log('WS closed Event: ', e['message']);\n        });\n        this.socket.addEventListener('error', (e) => { });\n        this.handlers = {\n            open: [],\n            close: [],\n            data: []\n        };\n    }\n    sends(datas) { this.handlers.data.push(datas); }\n    ;\n    onOpen() {\n        let data = '';\n        if (this.handlers.data.length > 0) {\n            data = this.handlers.data[0];\n            // debugger\n            if (this.readyState === 1) {\n                console.log('WebSocket connection opened!');\n                this.socket.send(data);\n                this.handlers.data.pop();\n                return;\n            }\n            else\n                setTimeout(() => this.onOpen(), 1000);\n        }\n        else if (this.readyState > 1) {\n            data = this.handlers.data[0];\n            this.socket.send(data);\n            this.handlers.data.pop();\n        }\n        else {\n            console.error('Not datas for a Sehding');\n            this.handlers.data.pop();\n        }\n    }\n    ;\n    get readyState() { return this.socket.readyState; }\n    onClose() { return this.socket.close(); }\n    ;\n    onError(e) { console.log('WebSocket error: ', e); }\n    ;\n}\nexports.WSocket = WSocket;\n// WebSocets\n\n\n//# sourceURL=webpack://child-frontend-config/./src/ts/models/websockets/index.ts?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.css */ \"./src/scss/style.css\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _ts_main_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ts/main.ts */ \"./src/ts/main.ts\");\n/* harmony import */ var _ts_main_ts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ts_main_ts__WEBPACK_IMPORTED_MODULE_2__);\n// src\\index.js\n\n\n\n\n\n//# sourceURL=webpack://child-frontend-config/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=frontend.1db09f0b57b08250dd97.js.map.
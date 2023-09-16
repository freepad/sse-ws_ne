const { WSocket } = require('../../models/websockets');
const { UsersNetwork } = require('../../models/users');
const { ChatSqreen } = require('../../models/chat');
const { fun } = require('../../functions/forms/logins');
const { getMetaDataUser, getNewPost } = require('../../functions');
<<<<<<< HEAD

=======
const url = "ws://localhost:7070"
>>>>>>> v4.2
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const chatInput = body[0].querySelector('.chattalks input') as HTMLElement;
let wsChat: any;
let ws: any;
<<<<<<< HEAD
=======
let thisIsMyId = '';
>>>>>>> v4.2
/**
 	 * Handler для событий из формы регистрации логина.
	 * Отправляем логин на сервер.
	 * @param e: event.
	 * @returns void
	 */
<<<<<<< HEAD
export async function sendToServe(e: any) {
	const input = body[0].querySelector('.login input') as HTMLInputElement;
	if (wsChat === undefined
		|| (wsChat
			&& (wsChat.readyState === 0 || wsChat.readyState > 1))) {
		ws = new WSocket("ws://localhost:7070/login");
	}
	ws.onMessage = getNewLogin();

	e.preventDefault();
	if (input.value.length < 1) return

	const resultOfFormIdentification = JSON.stringify(fun.idForn(e));
	ws.sends(resultOfFormIdentification);

=======
export async function sentNewLogin(e: any) {
	e.preventDefault();
	const input = body[0].querySelector('.login input') as HTMLInputElement;
	if (ws === undefined
		|| (ws
			&& (ws.readyState === 0 || ws.readyState > 1))) {
		console.log('/login URL')
		ws = new WSocket(url + "/login");
	}
	ws.onMessage = getNewLogin();

	if (input.value.length < 1) return
	/**Template: { newLogin: input.value } */
	const resultOfFormIdentification = JSON.stringify(fun.idForn(e));
	ws.sends(resultOfFormIdentification);
>>>>>>> v4.2
	ws.onOpen();
	input.value = ''
	return
}

<<<<<<< HEAD
/**
 * Функция отправляется на сервер , чтоб получить результат проверки логина
 * зарегистрирован или нет.
 * Если нет то объект нового пользователя вставляется в левый контейнер чата.
 * @returns void
=======
/** HANDLER
 * Данные отправленнвне на сервер, там проверка нового логина.
 * Полученные данные (логин после проверки ) - объект пользователя вставляется в левый контейнер чата.
 * @returns handler для event: 'message'
>>>>>>> v4.2
 */
function getNewLogin() {
	return (e: any) => {
		const req: string = e.data;
<<<<<<< HEAD

		if (req.length > 2) {
			const data = JSON.parse(e.data);
			if (("login" in data) === false) return
			const persone = addUser(data);


			const boxContainsUser = document.querySelectorAll('.accaunts');
			const newUser = persone.addUser;
			newUser.classList.add('imNew');
			// debugger;
			boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', newUser);
=======
		if (e.target.url !== url + "/login") return
		if (req.length > 2) {
			const data = JSON.parse(e.data);
			if (("login" in data) === false) return
			/** Template {login: < nik-name >, network: < on or of line >, id: < index user >} */
			const boxContainsUser = document.querySelectorAll('.accaunts');
			if (thisIsMyId.length < 5) thisIsMyId = data['id'];
			// debugger;
			const persone = addPropertiesUser(data);
			const newUser = persone['addHtmlUser'];
			newUser.classList.add('imNew');
			// boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', newUser);
			boxContainsUser[0].insertAdjacentElement('beforeend', newUser);
>>>>>>> v4.2

			body[0].querySelector('.chattalks > div:last-of-type')
				?.removeAttribute('style');
			body[0].querySelector('.author')?.remove();
<<<<<<< HEAD
=======

>>>>>>> v4.2
		}

		else if (req.length < 3) {
			const p = body[0].querySelector('.not') as HTMLInputElement;
			if (p) p.remove();

			const input = body[0].querySelector('.author') as HTMLInputElement;
			if (input) {
				input.insertAdjacentHTML('beforeend', ('<p class="not" style="color:red;">Пользователь уже зарегистрирован</p>' as any));
			}
		}
	}
}

/**
 * На входе получаем данные из БД.
 * Объект заполняем значениями свойств.
 * @param data: Данные
 * @returns обект.
 */
export function addPropertiesUser(data: any) {
	const persone = new UsersNetwork(data['login']);

<<<<<<< HEAD
	/* User network's status is checking  - start */
=======
	/* User network's status is checking ??  - start */
>>>>>>> v4.2
	if (navigator.onLine) persone.onOrOfLine = 'onLine';

	window.addEventListener("offline", (event) => {
		persone.onOrOfLine = 'offline';
	});
	/* User network's status is checking  - finish */

	persone.addId = data['id'];
<<<<<<< HEAD
=======
	persone.addHTMLUser;
	/** {login: < nik-name >, network: < on or of line >, id: < index user >} */
>>>>>>> v4.2
	return persone;
}


/* it for events by indentifikation a new Login - start*/
const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
const chat = new ChatSqreen(chatInput);
chat.getSqreenChat = sqreenChat;

chat.server = (elem: any) => {
<<<<<<< HEAD
	const user = getMetaDataUser();
	if ('id' in user) {
		elem['id'] = user['id'];

		if (wsChat === undefined
			|| (wsChat
				&& (wsChat.readyState === 0 || wsChat.readyState > 1))) {
			wsChat = new WSocket("ws://localhost:7070/chat");
		}

		let post = JSON.stringify(elem);
		wsChat.sends(post);
		wsChat.onOpen();
		wsChat.onMessage = getNewPost();
		return
	}
=======
	const userId = myId();


	// debugger;
	elem['id'] = userId;

	if (wsChat === undefined
		|| (wsChat
			&& (wsChat.readyState === 0 || wsChat.readyState > 1))) {
		console.log('/chat URL')
		wsChat = new WSocket(url + "/chat");
	}

	let post = JSON.stringify(elem);
	wsChat.sends(post);
	wsChat.onOpen();
	wsChat.onMessage = getNewPost();

	return
}

export function myId() {
	return thisIsMyId
>>>>>>> v4.2
}
// ServerEvents

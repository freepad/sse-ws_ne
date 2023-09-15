const { WSocket } = require('../../models/websockets');
const { UsersNetwork } = require('../../models/users');
const { ChatSqreen } = require('../../models/chat');
const { fun } = require('../../functions/forms/logins');
const { getMetaDataUser, getNewPost } = require('../../functions');
const url = "ws://localhost:7070"
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const chatInput = body[0].querySelector('.chattalks input') as HTMLElement;
let wsChat: any;
let ws: any;
/**
 	 * Handler для событий из формы регистрации логина.
	 * Отправляем логин на сервер.
	 * @param e: event.
	 * @returns void
	 */
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
	ws.onOpen();
	input.value = ''
	return
}

/**
 * Данные отправленнвне на сервер, там проверка нового логина.
 * Полученные данные (логин после проверки ) - объект пользователя вставляется в левый контейнер чата.
 * @returns handler для event: 'message'
 */
function getNewLogin() {
	return (e: any) => {
		const req: string = e.data;
		if (e.target.url !== url + "/login") return
		if (req.length > 2) {
			const data = JSON.parse(e.data);
			if (("login" in data) === false) return
			/** Template {login: < nik-name >, network: < on or of line >, id: < index user >} */
			const boxContainsUser = document.querySelectorAll('.accaunts');

			const persone = addPropertiesUser(data);
			const newUser = persone['addHtmlUser'];
			// debugger;
			newUser.classList.add('imNew');
			// boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', newUser);
			boxContainsUser[0].insertAdjacentElement('beforeend', newUser);

			body[0].querySelector('.chattalks > div:last-of-type')
				?.removeAttribute('style');
			body[0].querySelector('.author')?.remove();
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

	/* User network's status is checking ??  - start */
	if (navigator.onLine) persone.onOrOfLine = 'onLine';

	window.addEventListener("offline", (event) => {
		persone.onOrOfLine = 'offline';
	});
	/* User network's status is checking  - finish */

	persone.addId = data['id'];
	persone.addHTMLUser;
	/** {login: < nik-name >, network: < on or of line >, id: < index user >} */
	return persone;
}


/* it for events by indentifikation a new Login - start*/
const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
const chat = new ChatSqreen(chatInput);
chat.getSqreenChat = sqreenChat;

chat.server = (elem: any) => {
	const user = getMetaDataUser();

	if ('id' in user) {
		elem['id'] = user['id'];

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
}

// ServerEvents

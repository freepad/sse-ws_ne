const { WSocket } = require('../../models/websockets');
const { ChatSqreen } = require('../../models/chat');
const { default: addPropertiesUser } = require('./addPropertiesUser');
const { fun } = require('../../functions/forms/logins');
const moduleFun = require('../index.ts');
console.log('[getNewPost]: ', moduleFun);
const url = "ws://localhost:7070"
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const chatInput = body[0].querySelector('.chattalks input') as HTMLElement;
let wsChat: any;

let thisIsMyId = '';


/** HANDLER
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
			if (thisIsMyId.length < 5) thisIsMyId = data['id'];
			// debugger;
			const persone_ = addPropertiesUser(data);
			const newUser = persone_['addHtmlUser'];
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




/* it for events by indentifikation a new Login - start*/
const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
const chat = new ChatSqreen(chatInput);
chat.getSqreenChat = sqreenChat;

chat.server = (elem: any) => {
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
	wsChat.onMessage = moduleFun.getNewPost();

	return
}

function myId() {
	return thisIsMyId
}
// ServerEvents
module.exports = { myId, getNewLogin }

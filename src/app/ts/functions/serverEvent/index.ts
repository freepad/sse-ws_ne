// ServerEvents
const { WSocket } = require('../../models/websockets');
const { UsersNetwork } = require('../../models/users');
const { ChatSqreen } = require('../../models/chat');
const { fun } = require('../../functions/forms/logins');

const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const chatInput = body[0].querySelector('.chattalks input') as HTMLElement;
const chat = new ChatSqreen(chatInput);

/**
	 * Обработчик который отправляет имя логина н сервер. Проверяется - зарегистрирован или нет.
	 * @param e: событие.
	 * @returns void
	 */
export async function sendToServe(e: any) {
	const input = body[0].querySelector('.login input') as HTMLInputElement;
	const ws = new WSocket("ws://localhost:7070/login");
	ws.onMessage = getNewLogin();

	e.preventDefault();
	if (input.value.length < 1) return

	const resultOfFormIdentification = JSON.stringify(fun.idForn(e));
	ws.sends(JSON.stringify(resultOfFormIdentification));
	input.value = ''
}

/**
 * Отправляем отправляет имя логина н сервер. Проверяется - зарегистрирован или нет.
 *  Если нет то объект нового пользователя вставляется в левый контейнер чата.
 * @returns void
 */
function getNewLogin() {


	return (e: any) => {
		const req: string = e.data;

		if (req.length > 2) {
			const data = JSON.parse(e.data);
			if (("login" in data) === false) return
			const persone = addUser(data);

			const boxContainsUser = document.querySelectorAll('.accaunts');
			boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', persone.addUser);

			body[0].querySelector('.chattalks > div:last-of-type')
				?.removeAttribute('style');
			body[0].querySelector('.author')?.remove();
		}

		else if (req.length < 3) {
			const p = body[0].querySelector('.not') as HTMLInputElement;
			if (p) p.remove();

			const input = body[0].querySelector('.author') as HTMLInputElement;
			input.insertAdjacentHTML('beforeend', ('<p class="not" style="color:red;">Пользователь уже зарегистрирован</p>' as any));
		}
	}


}

/**
 * На входе получаем данные из БД и к объекту заполняем значение свойств.
 * Если предоставленные пользователем логин уже был зарегисрированный, функция
 * остаётся в режиме ожидания.
 * @param data: Данные
 * @returns обект со свеми его свойствами.
 */
export function addUser(data: any) {
	const persone = new UsersNetwork(data['login']);
	if (navigator.onLine) persone.onOrOfLine = 'onLine';

	window.addEventListener("offline", (event) => {
		persone.onOrOfLine = 'offline';
	});

	persone.addId = data['id'];
	persone.addId;

	chat.userChat = persone;
	return persone;
}

/* it for events by indentifikation a new Login - start*/
const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
chat.sendMessage = sqreenChat;

chat.server = (elem: any) => {
	const wsChat = new WSocket("ws://localhost:7070/chat");
	let post = JSON.stringify(elem);
	wsChat.sends(post);
	wsChat.onMessage = getNewPost();
}


function getNewPost() {
	return (e: any) => {
		const data = JSON.parse(e.data);
		debugger;
		if (("idPost" in data) === false) return
		const post = data['post']['message'];
		// const user = chat.user.login;
		const user = data['post']['login'];

		sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post">
					<div class="post-accaunt sourcename">${user}</div>
					<div class="date">01:25 20.03.2019</div>
					<div class="text">${post} </div>
				</div>` as any));
	}
}

// ServerEvents

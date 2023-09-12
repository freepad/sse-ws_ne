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
	// debugger;
	// if ('login'.indexOf(e.target.id) >= 0) {
	const input = body[0].querySelector('.login input') as HTMLInputElement;
	const ws = new WSocket("ws://localhost:7070/login");
	// debugger}
	ws.onMessage = getNewLogin();
	// debugger;
	e.preventDefault();
	if (input.value.length < 1) { console.log('Длина INPUT = 0:', input.value.length); return }

	console.log('Прослушка -  получили событие Inpuut из формы New-Login');
	const resultOfFormIdentification = JSON.stringify(fun.idForn(e));
	// debugger;
	ws.sends(JSON.stringify(resultOfFormIdentification));
	input.value = ''
}
// }

/**
 * Отправляем отправляет имя логина н сервер. Проверяется - зарегистрирован или нет.
 *  Если нет то объект нового пользователя вставляется в левый контейнер чата.
 * @returns void
 */
function getNewLogin() {

	// debugger;
	return (e: any) => {
		const req: string = e.data;
		// debugger
		// debugger;
		if (req.length > 2) {
			const data = JSON.parse(e.data);
			debugger
			if (("login" in data) === false) return
			const persone = addUser(data);


			const boxContainsUser = document.querySelectorAll('.accaunts');
			boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', persone.addUser);

			// debugger;
			body[0].querySelector('.chattalks > div:last-of-type')
				?.removeAttribute('style');
			body[0].querySelector('.author')?.remove();
		}
		else if (req.length < 3) {
			const p = body[0].querySelector('.not') as HTMLInputElement;
			if (p) p.remove();
			// debugger
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
	// debugger;
	if (navigator.onLine) {
		persone.onOrOfLine = 'onLine';
		// debugger;
	}

	console.log('User is now online');
	window.addEventListener("offline", (event) => {
		console.log('User is now offline');
		persone.onOrOfLine = 'offline';
	});

	persone.addId = data['id'];
	persone.addId;
	// if ("login" in persone)
	chat.userChat = persone;
	// debugger
	return persone;
}

/* it for events by indentifikation a new Login - start*/
// прослушка на "input" которая отправляет  сообщений
// chat.listenerInputChat;
const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
chat.sendMessage = sqreenChat;
// const mess = chat.sendMessage;
// debugger
// sendMessages({ post: mess });
chat.server = (elem: any) => {
	const wsChat = new WSocket("ws://localhost:7070/chat");
	let post = JSON.stringify(elem);
	// debugger
	wsChat.sends(post);
	wsChat.onMessage = getNewPost();

}

function getNewPost() {
	// debugger;
	return (e: any) => {

		const idPost = JSON.parse(e.data)['idPost'];
		const idUser = JSON.parse(e.data)['post']['id'];
		const post = JSON.parse(e.data)['post']['message'];
		debugger

		// let mess = data;//(chat.messageHtml as HTMLInputElement).value;
		const user = chat.user.login;
		// debugger;
		sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post">
					<div class="post-accaunt sourcename">${user}</div>
					<div class="date">01:25 20.03.2019</div>
					<div class="text">${post} </div>
				</div>` as any));
		debugger
		// const postOfChat = JSON.stringify({
		// 	id: this.user.addId,
		// 	message: mess,
		// })
		// this.server(postOfChat);
		// mess = '';

	}

}

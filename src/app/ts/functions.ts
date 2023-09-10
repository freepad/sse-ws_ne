const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const { WSocket } = require('./websockets');
let newLogin: any[] = [];
const { UsersNetwork } = require('./users');
const { ChatSqreen } = require('./chat');

const chatInput = body[0].querySelector('.chattalks input') as HTMLElement;
const chat = new ChatSqreen(chatInput);

export const fun = {
	forms() {
		return `<section class="author">
		<div class="title">
			<h2>Выберите псевдоним</h2>
		</div>
		<div class="form">
			<form action="" class="login" >
				<div class="input">
					<input type="text" maxlength="25" value="" id="login">
				</div>
				<div class="button">
					<button id="go" type="submit">Предложить</button>
				</div>
			</form>
		</div>
	</section>`
	},

	idForn(event: any) {
		console.log('Старт idForn()')
		if ((((event as MouseEvent).target as HTMLButtonElement).type === 'submit'
			|| (event as KeyboardEvent).key === 'Enter')) {
			const form = body[0].querySelector('.author') as HTMLFormElement;
			const input = form.querySelector('input') as HTMLInputElement;
			let result = '';
			event.preventDefault();
			console.log('Прослушка - получили данные для отправки на сервер из формы New-Login');
			return { newLogin: input.value }
		}
	},

	/**
	 * После того как DOM-страницы загрузался
	 * Открывает соединение на сервер.
	 * делает запрос зарегистрированных пользователей из "/" адреса
	 * Если есть пользователи, загружает их на страницу.
	 * и загрывает соединение
	 */
	loadPage() {
		newLogin = [];
		const wsLoadPage = new WSocket("ws://localhost:7070/");

		// debugger;
		wsLoadPage.onMessage = async (e: any) => {
			// debugger;
			const data = JSON.parse(e.data);
			console.log('DATA: ', data);
			// debugger;
			if (data['users'].length < 1) {
				wsLoadPage.onClose();
				return
			}
			await Array.from(data['users']).forEach((elem: any) => {

				const persone = addUser(elem);

				const boxContainsUser = document.querySelectorAll('.accaunts');
				boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', persone.addUser);
			});
			wsLoadPage.onClose();
		}
		const request = JSON.stringify({ users: [] });
		wsLoadPage.sends(request);

	}

}

/* it for events by indentifikation a new Login - start*/
/**
 *
 * @param elem: HTMLElement формы для ридентификации
 * Запускает прослешку событий на нажетие
 *  - клавиши "Enter"
 *  - click по "subnite"
 *
 * События вызывыют под-функцию "sendToServe".
 * Отправляет имя логина н сервер. Проверяется - зарегистрирован или нет.
	 *  Если нет то объект нового пользователя вставляется в левый контейнер чата.
 */
export function addLogin(elem: HTMLCollectionOf<HTMLElement>) {
	elem[0].insertAdjacentHTML("afterbegin", fun.forms());
	const formIdentification = body[0].querySelector('.author') as HTMLFormElement;
	const input = elem[0].querySelector('input') as HTMLInputElement;
	console.log("Получили форму для регистрации New Login!");

	window.addEventListener('offline', (e: any) => {
		console.warn("Note: User's browser id ofline now!");
	});

	formIdentification.addEventListener('keypress', (e: any) => {
		if ((e as KeyboardEvent).key === 'Enter') {
			// debugger;
			sendToServe(e);
			addUserStyle();
		};
	});
	formIdentification.addEventListener('click', (e: any) => {
		if (((e as MouseEvent).target as HTMLButtonElement).type === 'submit') {
			// debugger;
			sendToServe(e);
			addUserStyle();
		};
	});



	async function sendToServe(e: any) {
		const ws = new WSocket("ws://localhost:7070/login");

		// debugger}
		ws.onMessage = getNewLogin();
		// debugger;
		e.preventDefault();
		if (input.value.length < 1) { console.log('Длина INPUT = 0:', input.value.length); return }
		console.log('Прослушка -  получили событие Inpuut из формы New-Login');
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
		// debugger;
		return (e: any) => {
			const req: string = e.data;
			// debugger;
			if (req.length > 2) {
				const data = JSON.parse(e.data);
				const persone = addUser(data);


				const boxContainsUser = document.querySelectorAll('.accaunts');
				boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', persone.addUser);

				// debugger;
				elem[0].querySelector('.chattalks > div:last-of-type')
					?.removeAttribute('style');
				elem[0].querySelector('.author')?.remove()
			}
			else if (req.length < 3) {
				const p = elem[0].querySelector('.not') as HTMLInputElement;
				if (p) p.remove();
				// debugger
				const input = elem[0].querySelector('.author') as HTMLInputElement;
				input.insertAdjacentHTML('beforeend', ('<p class="not" style="color:red;">Пользователь уже зарегистрирован</p>' as any));

			}
		}
	}

}

function addUser(data: any) {
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
	chat.userChat = persone;

	return persone;
}

function addUserStyle() {
	setTimeout(() => {
		const users = document.querySelectorAll('.accaunt__online_one');
		users[users.length - 1].classList.add('you');
	}, 700);

}
/* it for events by indentifikation a new Login - start*/
// прослушка на "input" которая отправляет отправку сообщений
chat.listenerInputChat;
const sqreenChat = body[0].querySelector('.chattalks > div') as HTMLElement;
chat.sendMessage = sqreenChat;
debugger
// }

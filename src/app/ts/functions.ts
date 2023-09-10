const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const { WSocket } = require('./websockets');
let newLogin: any[] = [];
const { UsersNetwork } = require('./users');


// export function generates(generate: any) {
// 	newLogin.push((generate));
// 	return newLogin
// }

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

	author(event: any) {
		console.log('Старт author()')



		if ((((event as MouseEvent).target as HTMLButtonElement).type === 'submit'
			|| (event as KeyboardEvent).key === 'Enter')) {
			const form = body[0].querySelector('.author') as HTMLFormElement;
			const input = form.querySelector('input') as HTMLInputElement;
			let result = '';
			event.preventDefault();
			console.log('Прослушка - получили данные для отправки на сервер из формы New-Login');
			return { newLogin: input.value }


		}

	}
}

/* it for events by indentifikation a new Login - start*/

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
		const ws = new WSocket("ws://localhost:7070");
		// debugger
		ws.onMessage = getNewLogin();
		// debugger;
		e.preventDefault();
		if (input.value.length < 1) { console.log('Длина INPUT = 0:', input.value.length); return }
		console.log('Прослушка -  получили событие Inpuut из формы New-Login');
		const resultOfFormIdentification = JSON.stringify(fun.author(e));
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
			// debugger;
			if (req.length > 2) {
				const data = JSON.parse(e.data);

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
				// debugger;

				const boxContainsUser = document.querySelectorAll('.accaunts');
				boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', persone.addUser);
				// debugger;
				elem[0].querySelector('.author')?.remove()
			}
			else if (req.length < 3) {
				const p = elem[0].querySelector('.not') as HTMLInputElement;
				if (p) p.remove();
				debugger
				const input = elem[0].querySelector('.author') as HTMLInputElement;
				input.insertAdjacentHTML('beforeend', ('<p class="not" style="color:red;">Пользователь уже зарегистрирован</p>' as any));

			}
		}
	}

}

function addUserStyle() {
	setTimeout(() => {
		const users = document.querySelectorAll('.accaunt__online_one');
		users[users.length - 1].classList.add('you');
	}, 700);

}



/* it for events by indentifikation a new Login - start*/

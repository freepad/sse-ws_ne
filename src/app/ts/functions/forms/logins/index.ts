let newLogin: any[] = [];
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;;
const { WSocket } = require('../../../models/websockets');
const { addUser } = require('../../serverEvent');

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

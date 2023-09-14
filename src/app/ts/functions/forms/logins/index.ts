// function / forms

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
		if ((((event as MouseEvent).target as HTMLButtonElement).type === 'submit'
			|| (event as KeyboardEvent).key === 'Enter')) {
			event.preventDefault();
			const form = body[0].querySelector('.author') as HTMLFormElement;
			const input = form.querySelector('input') as HTMLInputElement;
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
			console.log('DATA: ', data, typeof data);
			if (data['users'].length < 1) {
				wsLoadPage.onClose();
				return data
			}
			let postReSort: any[] = [];
			debugger;
			/** сортировка */
			if (data['posts'] && data['posts'].length > 0) {
				postReSort = await Array.from(data['posts']).sort((postA: any, postB: any): number => {
					let int: number = 0;
					int = postA['idPost'] > postB['idPost'] ? -1 : 1;
					return int
				});
			};

			/* выкладываем пользователей */
			Array.from(data['users']).forEach((elem: any) => {
				const persone = addUser(elem);
				const boxContainsUser = document.querySelectorAll('.accaunts');
				boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', persone.addUser);
			});

			/** к постам из БД присваеваем логины */
			postReSort.forEach((item: any) => {
				for (let i = 0; i < data['users'].length; i++) {
					if (item['post']['id'].indexOf(data['users'][i]['id']) >= 0) {
						item['login'] = data['users'][i]['login'];
					}
				}
			});

			/** выкладываем посты  */
			/**Выкладываем посты в экран чата */
			const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
			postReSort.forEach((item: any) => {
				const user: string = item['login'];
				const post: string = item['post']['message'];

				sqreenChat.insertAdjacentHTML('afterbegin', (`<div class="post">
					<div class="post-accaunt sourcename">${user}</div>
					<div class="date">01:25 20.03.2019</div>
					<div class="text">${post} </div>
				</div>` as any));
			});

			postReSort = [];
			wsLoadPage.onClose();
			return data
		}
		const request = JSON.stringify({ users: [] });
		wsLoadPage.sends(request);
		wsLoadPage.onOpen();
	}
}

// function / forms

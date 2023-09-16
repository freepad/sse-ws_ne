// function / forms
let newLogin: any[] = [];
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;;
const { WSocket } = require('../../../models/websockets');
const { addPropertiesUser, myId } = require('../../serverEvent');
let wsLoadPage: any;
const mapListUsers = new Map();

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
	//  * и загрывает соединени??????????
	 */
	loadPage() {
		/** Первичная закгрузка страницы **/
		newLogin = [];
		if (wsLoadPage === undefined
			|| (wsLoadPage
				&& (wsLoadPage.readyState === 0 || wsLoadPage.readyState > 1))) {
			console.log('/ URL')
			wsLoadPage = new WSocket("ws://localhost:7070/");

		}
		// debugger;
		wsLoadPage.onMessage = async (e: any) => {
			if (e.target.url !== "ws://localhost:7070/") return
			const data = JSON.parse(e.data);
			if ('users' in data && data['users'].length < 1) data;
			let postReSort: any[] = [];
			// debugger;
			/** сортировка данных из db */
			if (data['posts'] && data['posts'].length > 0) {
				postReSort = await Array.from(data['posts']).sort((postA: any, postB: any): number => {
					let int: number = 0;
					int = postA['idPost'] > postB['idPost'] ? -1 : 1;
					return int
				});
			};

			/* выкладываем пользователей */
			if ('users' in data) {
				// debugger;
				mapListUsers.clear();
				(body[0].querySelector('.accaunts') as HTMLElement)
						.replaceChildren('');

				Array.from(data['users']).forEach((elem: any) => {
					console.log('выкладываем пользователей : ', elem);
					mapListUsers.set(elem['id'], elem['login'])
					const persone = addPropertiesUser(elem);
					const boxContainsUser = document.querySelectorAll('.accaunts');
					boxContainsUser[boxContainsUser.length - 1].insertAdjacentElement('beforeend', (persone.addHtmlUser as HTMLElement));
			});
			}

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
			if (myId().length === 0) {
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
			}
			return data
		}
		const request = JSON.stringify({ users: [] });
		wsLoadPage.sends(request);
		wsLoadPage.onOpen();
	}
}

// function / forms

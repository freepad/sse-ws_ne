const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const { sendToServe } = require('./serverEvent');
const { fun } = require('./forms/logins');

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

	window.addEventListener('offline', (e: any) => {
		console.warn("Note: User's browser id ofline now!");
	});

	formIdentification.addEventListener('keypress', (e: any) => {
		if ((e as KeyboardEvent).key === 'Enter') {
			sendToServe(e)
				.then(() => {
					addUserStyle();
				});
		};
	});
	formIdentification.addEventListener('click', (e: any) => {
		if (((e as MouseEvent).target as HTMLButtonElement).type === 'submit') {

			sendToServe(e)
				.then(() => {
					addUserStyle();
					//

				});
		};
	});
}

/**
 * Обновляем внешний вид логина в колонке чата.
 */
let i = 0;
function addUserStyle() {
	// setTimeout(() => {
	let user: Element[] = [];
		const users = document.querySelectorAll('.accaunt__online_one');
	user = Array.from(users).filter((elem: any) => { if (elem.className.includes('imNew')) return elem });
	// debugger;
	if (user.length > 0) {
		user[0].classList.remove('imNew');
		user[0].classList.add('you');
		return
	}
	setTimeout(() => addUserStyle(), 1000);

}

export function getMetaDataUser() {
	let userId: any = {};
	const boxContainsUser = document.querySelector('.you')
		?.querySelector('.sourcename');
	// debugger
	if (boxContainsUser?.hasAttribute('data-num')) {
		userId = { id: boxContainsUser?.getAttribute('data-num') };
	}
	return userId

}

const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
export function getNewPost() {
	return (e: any) => {
		const data = JSON.parse(e.data);
		// debugger;
		if (("idPost" in data) === false) return
		const post = data['post']['message'];
		// const user = chat.user.login;
		const user = data['post']['login'];

		sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post">
					<div class="post-accaunt sourcename">${user}</div>
					<div class="date">01:25 20.03.2019</div>
					<div class="text">${post} </div>
				</div>` as any));
		// wsChat.onClose();
	}
}

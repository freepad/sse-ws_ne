// function

const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const { sentNewLogin, myId } = require('./serverEvent');
const { fun } = require('./forms/logins');

/* it for events by indentifikation a new Login - start*/
/**
 * РЕГИСТРАЦИЯ ЛОГИНА event
 * @param elem: HTMLElement формы для ридентификации
 * Запускает прослешку событий на нажетие
 *  - клавиши "Enter"
 *  - click по "subnite"
 *
 * События вызывыют под-функцию "sentNewLogin".
 * "sentNewLogin" Отправляет имя нового логина на сервер.
 */
export function addLogin(elem: HTMLCollectionOf<HTMLElement>) {
	elem[0].insertAdjacentHTML("afterbegin", fun.forms());
	const formIdentification = body[0].querySelector('.author') as HTMLFormElement;


	formIdentification.addEventListener('keypress', (e: any) => {
		if ((e as KeyboardEvent).key === 'Enter') {
<<<<<<< HEAD
			sendToServe(e)
				.then(() => { addUserStyle() });
			// .then(() => windowsOfflineUser());
=======
			sentNewLogin(e)
				.then(() => { addUserStyle() });
>>>>>>> v4.2
		};
	});
	formIdentification.addEventListener('click', (e: any) => {
		if (((e as MouseEvent).target as HTMLButtonElement).type === 'submit') {
<<<<<<< HEAD
			sendToServe(e)
				.then(() => { addUserStyle() });
			// .then(() => windowsOfflineUser());
=======
			sentNewLogin(e)
				.then(() => { addUserStyle() });
>>>>>>> v4.2
		};
	});
}

/**
 * Обновляем внешний вид логина в колонке чата.
 */
let i = 0;
function addUserStyle() {
	let user: Element[] = [];
	const users = document.querySelectorAll('.accaunt__online_one');
	user = Array.from(users).filter((elem: any) => { if (elem.className.includes('imNew')) return elem });

	if (user.length > 0) {
		user[0].classList.remove('imNew');
		user[0].classList.add('you');
		return
	}
	setTimeout(() => addUserStyle(), 1000);
}

<<<<<<< HEAD
export function getMetaDataUser() {
	let userId: any = {};
	const boxContainsUser = document.querySelector('.you')
		?.querySelector('.sourcename');

	if (boxContainsUser?.hasAttribute('data-num')) { userId = { id: boxContainsUser?.getAttribute('data-num') } }
	return userId
}

=======
>>>>>>> v4.2
const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
export function getNewPost() {
	return (e: any) => {
		const data = JSON.parse(e.data);
<<<<<<< HEAD
		debugger;
		if (("idPost" in data) === false) return
=======

		if (e.target.url !== "ws://localhost:7070/chat"
			|| ("idPost" in data) === false) return
>>>>>>> v4.2
		const post = data['post']['message'];
		let user = data['post']['login'];

		/**Все посты , отправленные пользователем проходят через БД. Пожьлму, получаем данные  */
		const ImUser = document.querySelector('.you') as HTMLElement; // Получаем id-пользователя
		const postConyains = `</div>
					<div class="date">01:25 20.03.2019</div>
<<<<<<< HEAD
					<div class="text">${post} </div>
				</div>`

		if ((ImUser.querySelector('div:last-of-type') as HTMLElement).hasAttribute('data-num')
			&& ((ImUser.querySelector('div:last-of-type') as HTMLElement).getAttribute('data-num') as string).indexOf(data['post']['id']) >= 0) {
=======
					<div class="text">${post}</div>
				</div>`

		// if ((ImUser.querySelector('div:last-of-type') as HTMLElement).hasAttribute('data-num') /* you -------- */
		debugger;
		if (myId().length > 5 && myId().indexOf(data['post']['id']) >= 0) {
>>>>>>> v4.2
			user = 'You';
			sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post your-post">
			<div class="post-accaunt sourcename">${user}` + postConyains as any)); // помечаем авторские посты
			return
		}
		sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post">
		<div class="post-accaunt sourcename">${user}` + postConyains as any));


	}
}

<<<<<<< HEAD
// function windowsOfflineUser() {
// 	const user = document.querySelector(`.you`) as HTMLElement;
// 	if (!user) {
// 		setInterval(() => windowsOfflineUser(), 1000);
// 		return
// 	}
// 	return window.addEventListener('offline', (e: any) => {
// 		console.warn("Note: User's browser id ofline now!");
// 		user.remove();
// 	});

// }

// function
=======

>>>>>>> v4.2

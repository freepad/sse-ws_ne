// src\app\frontend\src\ts\functions\index.ts


const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
// const { sentNewLogin, myId } = require('./serverEvent');
const se = require('./serverEvent');
const { default: sentNewLogin } = require('./serverEvent/sentNewLogin');
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
			console.log('[SE Enter]: ', sentNewLogin);
			sentNewLogin(e)
				.then(() => { addUserStyle() });
		};
	});

	formIdentification.addEventListener('click', (e: any) => {
		if (((e as MouseEvent).target as HTMLButtonElement).type === 'submit') {
			console.log('[SE submit]: ', sentNewLogin);
			sentNewLogin(e)
				.then(() => { addUserStyle() });
		};
	});
}

/**
 * Обновляем внешний вид логина в колонке чата.
 */
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

const sqreenChat = body[0].querySelector('.chattalks > div:first-of-type') as HTMLElement;
export function getNewPost(): (e: any) => void {
	return (e: any) => {
		const data = JSON.parse(e.data);

		if (e.target.url !== "ws://localhost:7070/chat"
			|| ("idPost" in data) === false) return
		const post = data['post']['message'];
		let user = data['post']['login'];

		/**Все посты , отправленные пользователем проходят через БД. Пожьлму, получаем данные  */
		const ImUser = document.querySelector('.you') as HTMLElement; // Получаем id-пользователя
		const postConyains = `</div>
					<div class="date">01:25 20.03.2019</div>
					<div class="text">${post}</div>
				</div>`

		// if ((ImUser.querySelector('div:last-of-type') as HTMLElement).hasAttribute('data-num') /* you -------- */
		debugger;
		if (se.myId().length > 5 && se.myId().indexOf(data['post']['id']) >= 0) {
			user = 'You';
			sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post your-post">
			<div class="post-accaunt sourcename">${user}` + postConyains as any)); // помечаем авторские посты
			return
		}
		sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post">
		<div class="post-accaunt sourcename">${user}` + postConyains as any));


	}
}





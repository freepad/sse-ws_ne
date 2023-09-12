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
			sendToServe(e);
			addUserStyle();
		};
	});
	formIdentification.addEventListener('click', (e: any) => {
		if (((e as MouseEvent).target as HTMLButtonElement).type === 'submit') {

			sendToServe(e);
			addUserStyle();
		};
	});
}

/**
 * Обновляем внешний вид логина в колонке чата.
 */
function addUserStyle() {
	setTimeout(() => {
		const users = document.querySelectorAll('.accaunt__online_one');
		users[users.length - 1].classList.add('you');
	}, 700);

}

// functions

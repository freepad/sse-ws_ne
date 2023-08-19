/* авторизация */
function forms() {
	return `<section class="Login">
		<div class="title">
			<h2>Выберите псевдоним</h2>
		</div>
		<div class="form">
			<form action="" class="login">
				<div class="input">
					<input type="text" maxlength="25" value="" id="login">
				</div>
				<div class="button">
					<button type="submit">Предложить</button>
				</div>
			</form>
		</div>
	</section>`
}

/* -----FORM a checkins new Login if not the existence----- Start*/
const existenceAccaunts = document.getElementsByClassName('sourcename') as HTMLCollectionOf<HTMLElement>;
let inputValue: string = '';


/**
 *TODO: checking the existencr of a new login from the new user.
 * @param arr: It's array of all accounts which we can see on page
 * returns: 'false' if new login can't be unique and a 'true' if's a unique
 */
const checkToExistence = (arr: HTMLCollectionOf<HTMLElement>): boolean => {
	document.body.removeEventListener('keypress', handlers.onKeyEnter, true); // При переходе НА фрму через фокус, правило не срабатывает
	document.removeEventListener('mousedown', handlers.insertNewLogin);



	return false
}

/* -----FORM a checkins new Login if not the existence----- finish/


/* -----FORM Input from new Login----- Start*/
/***
 * TODO: Checking input's symbols/line from the input form. This's line in which entries a new login from the new user/
 */
const checkingTextToAutorization = (elem: HTMLInputElement) => {
	const regexp = new RegExp(/^[a-zA-Z]\w{3,}/, 'i');

	elem.oninput = () => {
		let inputArray = regexp.exec(elem.value)
		if (inputArray !== null
			&& (inputArray as any).input.length === (inputArray as any)[0].length) {
			if (elem.hasAttribute('style')) elem.removeAttribute('style');
			inputValue = (inputArray as any[])[0];
			return

		} else if (inputArray !== null
			|| (inputArray === null && elem.value !== undefined)) {
			elem.setAttribute('style', "color:#ff0000;");
			return
		}
	};
};


// const removeEListener = () => {
// 	document.body.removeEventListener('keypress', handlers.onKeyEnter, true); // При переходе НА фрму через фокус, правило не срабатывает
// 	document.removeEventListener('mousedown', handlers.insertNewLogin);
// }



const handlers = {

	onMouseClick(e: MouseEvent) {
		if ((e.target as HTMLButtonElement).type === "submit") {
			e.preventDefault();
			// removeEListener();

			if (inputValue.length > 3) checkToExistence(existenceAccaunts)
			return
		}
	},

	onKeyEnter(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			// removeEListener();

			if (inputValue.length > 3) checkToExistence(existenceAccaunts)
			return
		}
	},

	insertNewLogin(e: MouseEvent) {
		const inputElem = (e.target as HTMLInputElement);

		if (inputElem.id === "login") {
			checkingTextToAutorization(inputElem);
			document.body.addEventListener('keypress', handlers.onKeyEnter, true);
			document.body.addEventListener('click', handlers.onMouseClick, true);
		}
	}
}
/* -----FORM Input from new Login----- Finish*/


export { forms, handlers }

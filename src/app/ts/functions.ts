/* -----FORM a checkins new Login if not the existence----- Start*/
const existenceAccaunts = document.getElementsByClassName('sourcename') as HTMLCollectionOf<HTMLElement>;
let inputValue: string = '';


/* -----Sents and accepts to/of the server-----  Start*/
async function sendOneData(elem: string) {
	const response = await fetch('http://localhost:7070/', {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ login: elem }), // body data type must match "Content-Type" header
	});
	let resp = await response.json();
	let result = await resp;
	console.log('RESULT: ', result);
};
/* -----Sents and accepts to/of the server-----  Finish*/


/***
 * TODO: Checking input's symbols/line from the input form. This's line in which entries a new login from the new user/
 * @param elem: This's an input field (from popUp box for a uatorization).
 * returns won't be
 */
const checkLiveForAutorization = (elem: HTMLInputElement) => {
	const regexp = new RegExp(/^[a-zA-Z]\w{3,}/, 'i');

	elem.oninput = () => {
		let inputArray = regexp.exec(elem.value)
		if (inputArray !== null
			&& (inputArray as any).input.length === (inputArray as any)[0].length) {
			if (elem.hasAttribute('style')) elem.removeAttribute('style');
			inputValue = (inputArray as any[])[0];

		} else if (inputArray !== null
			|| (inputArray === null && elem.value !== undefined)) {
			elem.setAttribute('style', "color:#ff0000;");
			inputValue = '';
		}
	};
};


/**
 *TODO: checking the existencr of a new login from the new user.
 * @param arr: It's array of all accounts which we can see on page
 * returns: 'false' if new login can't be unique and a 'true' if's a unique
 */
const checkLoginToExistence = (arr: HTMLCollectionOf<HTMLElement>): boolean => {
	const result = Array.from(arr).filter((item: HTMLElement) => inputValue === item.innerText);
	return result.length > 0 ? false : true
}

const handlers = {
	EventsAutorization(e: MouseEvent | KeyboardEvent) {
		if (((e as MouseEvent).target as HTMLButtonElement).type === "submit"
			|| ((e as KeyboardEvent).key == 'Enter')) {
			e.preventDefault();

			if (inputValue.length > 3
				&& checkLoginToExistence(existenceAccaunts) === true) {

				const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
				/* remove a form uatorization */
				(body[0].querySelector('.author') as HTMLElement).setAttribute('style', 'display:none;');
				/* public form input type=text for will send the message into the chat. */
				(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).removeAttribute('style');
				sendOneData(inputValue);
			}
			return
		}
	},

	insertNewLogin(e: MouseEvent) {
		const inputElem = (e.target as HTMLInputElement);

		if (inputElem.id === "login") {
			checkLiveForAutorization(inputElem);
			document.body.addEventListener('keypress', handlers.EventsAutorization, true);
			document.body.addEventListener('click', handlers.EventsAutorization, true);
		}
	},

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
					<button type="submit">Предложить</button>
				</div>
			</form>
		</div>
	</section>`
	}
}
/* -----FORM Input from new Login----- Finish*/
export { handlers }

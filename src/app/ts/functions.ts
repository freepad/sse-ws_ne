const { Persons } = require("./users.ts");
const { fetchRequest } = require("./fech-request");

/* -----FORM a checkins new Login if not the existence----- Start*/
const existenceAccaunts = document.getElementsByClassName('sourcename') as HTMLCollectionOf<HTMLElement>;
let inputValue: string = '';

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

const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
export const handlers = {
	EventUsersLoads(elem: HTMLCollectionOf<HTMLElement>) {
		console.log('Hadleer EventUsersLoads', elem);

		const req = new fetchRequest();
		req.loadExistencesLogins()
			.then((result: any) => { return result.json() })
			.then((result: any) => {
				console.log('Logins-arr RESULT: ', result)
			});
	},

	EventsAutorization(e: MouseEvent | KeyboardEvent) {
		if (((e as MouseEvent).target as HTMLButtonElement).type === "submit"
			|| ((e as KeyboardEvent).key == 'Enter')) {
			e.preventDefault();

			if (inputValue.length > 3
				&& checkLoginToExistence(existenceAccaunts) === true) {
				const formAutor = (body[0].querySelector('.author') as HTMLElement);
				/* remove a form uatorization */

				/* public form input type=text for will send the message into the chat. */


				const req = new fetchRequest();
				req.sendOneLoginStr(inputValue)
					.then((result: any) => {
						if (!result.ok) return
						return result.json();
					})
					.then((result: any): boolean => { return Object.values(result)[0] === 'Ok' ? true : false })
					.then((resp: boolean) => {
						const newLogin = document.querySelector('.login');
						if (!resp) {
							newLogin?.insertAdjacentHTML('beforeend', '<p style="color:red">Полуьзователь уже сузществует</p>');
							return
						}
						/* This's the Input forms from the mmain page- start */
						formAutor.setAttribute('style', 'display:none;');
						(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).removeAttribute('style');
						/* This's the Input forms - finished */


						const newPerson = new Persons(inputValue);
						let personList = newPerson.participantsAdd = document.querySelectorAll('.accaunts');
						const perArr = personList[0].querySelectorAll('.accaunt__online_one');
						newPerson.personСss = perArr[perArr.length - 1];
						newPerson.personСss
						inputValue = '';
						return
					});
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
// module.exports = { handlers, sendOneLoginStr }
// export default { handlers, sendOneLoginStr }

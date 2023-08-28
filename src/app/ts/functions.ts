const { Persons } = require("./users.ts");

/* -----FORM a checkins new Login if not the existence----- Start*/
const existenceAccaunts = document.getElementsByClassName('sourcename') as HTMLCollectionOf<HTMLElement>;
let inputValue: string = '';
let result = {}


function __fetchPOSTRequestToServer(paths: any = './', method: string = "GET",
	contentTypes: string, requestBody: {} | undefined = {},
) {
	let requestBodies = JSON.stringify(requestBody);
	console.log("fetxn_ PATHS:", paths)
	console.log("fetxn_ METHOD: ", method);
	console.log("fetxn_ contentTYPES:", contentTypes)
	console.log("fetxn_ requestBODY: ", requestBody);
	// console.log("fetxn_")
	// console.log("fetxn_")
	return fetch(paths, {
		method: method, // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			"Content-Type": contentTypes,
		},
		body: requestBodies, // body data type must match "Content-Type" header
	});
}

/* -----Sents and accepts to/of the server-----  Start*/
/**
 * TODO: function geting It's keep a new lodin name which a user input for a autorisation to the chat
 * @param elem: this's type 'string' . It's keep a new lodin name.
 * @returns respons of 'localhost:7070'. Respons keeps it in self the 'OK' or null. If 'Ok' it's have unique
 * new login into the chat-db. If a null it's no unique.
 */
export async function sendOneLoginStr(elem: string) {
	let requestBody = { login: elem };
	let paths = 'http://localhost:7070/';
	let contentTypes = "application/json";
	let method = "POST";

	const response = await __fetchPOSTRequestToServer(
		paths = paths,
		method = method,
		contentTypes = contentTypes,
		requestBody = requestBody
	);
	result = await response.json();
	console.log('RESULT: ', result);
	return result
};
// переделать Ориентироваться на status
// Поситать про throw в пормисах

async function getExistencesLoginsArr(): Promise<string[]> {
	console.log('ASYNC getExistencesLoginsArr');
	// let requestBody = {};
	// let paths = 'http://localhost:7070/';
	// let contentTypes = "application/json";
	// let method = "GET";

	const response = await __fetchPOSTRequestToServer(
		'http://localhost:7070/', "GET",
		"application/json"
	);
	console.log('RE: ', response);
	let res = await response.json();
	console.log("LoginsArr RES: ", res);
	return res
}
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

		getExistencesLoginsArr()
			.then((result) => {
				console.log("RESULT: ", result[0]);
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
				(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).removeAttribute('style');
				sendOneLoginStr(inputValue)
					.then((result): boolean => {
						let res = Object.values(result)[0] as string;
						console.log('RES: ', res)
						if (typeof res !== 'string') return false
						return true
					})
					.then((resp: boolean) => {
						const newLogin = document.querySelector('.login');
						if (!resp) {
							console.log('RESP', resp)
							newLogin?.insertAdjacentHTML('beforeend', '<p style="color:red">Полуьзователь уже сузществует</p>');
							return
						}
						formAutor.setAttribute('style', 'display:none;');
						const newPerson = new Persons(inputValue);
						let personList = newPerson.participantsAdd = document.querySelectorAll('.accaunts');
						const perArr = personList[0].querySelectorAll('.accaunt__online_one');
						console.log('PERSON: ', perArr[0]);
						console.log('PERSON2: ', perArr[perArr.length - 1]);
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

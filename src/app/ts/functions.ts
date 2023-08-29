const { Persons } = require("./users.ts");

/* -----FORM a checkins new Login if not the existence----- Start*/
const existenceAccaunts = document.getElementsByClassName('sourcename') as HTMLCollectionOf<HTMLElement>;
let inputValue: string = '';
let result = {}


// function __fetchRequestToServer(
// 	paths: any = './',
// 	methodGet: boolean = false,
// 	methodPost: boolean = false,
// 	contentTypes: string,
// 	requestBody: {} = {},
// ) {
// 	let method = 'GET';
// 	let requestBodies = JSON.stringify(requestBody);
// 	console.log("fetxn_ PATHS:", paths)
// 	console.log("fetxn_ contentTYPES:", contentTypes)
// 	console.log("fetxn_ requestBODY: ", requestBody);
	// console.log("fetxn_")
	// console.log("fetxn_")
// if (methodPost) {
// 	method = 'POST'
// 	console.log("fetxn_ METHOD: ", method);
// 	return fetch(paths, {
// 		method: method, // *GET, POST, PUT, DELETE, etc.
// 		mode: "cors", // no-cors, *cors, same-origin
// 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// 		headers: {
// 			"Content-Type": contentTypes,
// 		},
// 		body: requestBodies, // body data type must match "Content-Type" header
// 	});
// }
// else if (methodGet) {
// 		console.log("fetxn_ METHOD: ", method);
// 	return fetch(paths, {
// 		method: method,
// 		mode: "cors",
// 		cache: "no-cache",
// 		headers: {
// 			"Content-Type": contentTypes,
// 		},
// 	});
// }
// }

/* -----Sents and accepts to/of the server-----  Start*/

class fetchRequest {
	paths?: any;
	contentTypes?: string;
	bodyRequest: {};
	// methods: ('GET' | 'POST' | 'PUT' | 'DELETE');
	constructor(
		paths = 'http://localhost:7070/',
		methodGet = false,
		methodPost = false,
		contentTypes = "application/json",

	) {
		this.paths = paths;
		this.contentTypes = contentTypes;
		// this.methods = 'GET';
		this.bodyRequest = {};
	}

	/**
	 * TODO: function geting It's keep a new lodin name which a user input for a autorisation to the chat
	 * @param elem: this's type 'string' . It's keep a new lodin name.
	 * @returns respons of 'localhost:7070'. Respons keeps it in self the 'OK' or null. If 'Ok' it's have unique
	 * new login into the chat-db. If a null it's no unique.
	 */
	async sendOneLoginStr(elem: string) {
		console.log('ASYNC sendOneLoginStr');
		// this.methods = 'POST';

		this.bodyRequest = { login: elem }
		let resp = await this.#fetchRequestToServer('POST')
		console.log('ASYNC sendOneLoginStr RESP: ', resp);
		return
	}

	async loadExistencesLogins() {
		console.log('ASYNC loadExistencesLogins');
	// let requestBody = {};
	// let paths = 'http://localhost:7070/';
	// let contentTypes = "application/json";
	// let method = "GET";
		return await this.#fetchRequestToServer('GET');
	}

	#fetchRequestToServer(methods = 'GET', requestBody: object = {}) {
		let result: any;
		// let contentTs = function () { return this }.bind(this.contentTypes);
		this.bodyRequest = requestBody;

		let params: any = {
			method: methods, // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			headers: {
				"Content-Type": this.contentTypes
			}
		}

		if (params['method'] === 'POST') {
			console.log('POST params', params['body'])
			console.log('POST params', params['method'] === 'POST')
			params['body'] = this.bodyRequest; // body data type must match "Content-Type" header
			// params['method'] = 'POST'
			console.log('POST params: ', params)
			return fetch(this.paths, params);


		}
		else if (params['method'] === 'GET') {
			console.log('GET params', params)


			return fetch(this.paths, params)
		}
	}
}

// переделать Ориентироваться на status
// Поситать про throw в пормисах


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

		const req = new fetchRequest();
		req.loadExistencesLogins()
			.then((result: any) => {
				console.log('Logins-arr result JSON: ', result.json())
				const res = result
				return res
			})
			.then((result) => {
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
				(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).removeAttribute('style');
				const req = new fetchRequest();
				// req.sendOneLoginStr(inputValue)
				// 	.then((result): boolean => {
				// 		console.log('RES: ', result)
						// let res = Object.values(result)[0] as string;
						// console.log('RES 01: ', res)
						// if (typeof res !== 'string') return false
					// 	return true
					// })
					// .then((resp: boolean) => {
					// 	const newLogin = document.querySelector('.login');
					// 	if (!resp) {
					// 		console.log('RESP', resp)
					// 		newLogin?.insertAdjacentHTML('beforeend', '<p style="color:red">Полуьзователь уже сузществует</p>');
					// 		return
					// 	}
					// 	formAutor.setAttribute('style', 'display:none;');
					// 	const newPerson = new Persons(inputValue);
					// 	let personList = newPerson.participantsAdd = document.querySelectorAll('.accaunts');
					// 	const perArr = personList[0].querySelectorAll('.accaunt__online_one');
					// 	console.log('PERSON: ', perArr[0]);
					// 	console.log('PERSON2: ', perArr[perArr.length - 1]);
					// 	newPerson.personСss = perArr[perArr.length - 1];
					// 	newPerson.personСss
					// 	inputValue = '';
					// 	return
					// });
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

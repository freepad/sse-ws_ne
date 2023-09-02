const { UsersNetwork } = require("./chating/users.ts");
const { fetchRequest } = require("./fech-request");
const { checkLoginValidate } = require("./validators");

/* -----FORM a checkins new Login.  ----- Start*/
/**
 * It's only a font's visual style  from the foms authorization
 */
let inputValue: string = '';
const checkLiveForAutorization = (elem: HTMLInputElement) => {
	elem.addEventListener('input', () => {
		const response = checkLoginValidate(elem.value);
		if (response) {
			if (elem.hasAttribute('style')) elem.removeAttribute('style');
			inputValue = (elem.value as any)[0];
			inputValue = elem.value;
		} else if (!response) {
			elem.setAttribute('style', "color:#ff0000;");
		}
	});
};
/* -----FORM a checkins new Login ----- End */



/*** This's a handlers for the Events */
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const boxAccaunts = document.querySelectorAll('.accaunts');

export const handlers = {



	EventUsersLoads(elem: HTMLCollectionOf<HTMLElement>) {
		console.log('Hadleer EventUsersLoads', elem);

		const req = new fetchRequest();

		req.makeGetRequest()
			.then((result: any) => { return result.json() })
			.then((result: any) => {
				(Object.values(result)[0] as any).forEach((item: any) => {
					/**
					 * Loading on a page all the Logins from the db    begining*/
					const persons = new UsersNetwork(item['login']);
					persons.addId = item['ind'];

					persons.participantsAdd
					persons.participantsAdd = boxAccaunts;
					/* * Loading on a page all the Logins from the db    finished*/
				});

			});
	},

	/**
	 * This's function geting to the entrance the Event:MouseEvent
	 * @param e : It's an Event from the buttom by the form for indetifacation/.
	 * @param inputValue: It's a value from the input field.
	 * @returns The void. Only can see in the browser this form/ If 'inputValue' is unique so it a forms removing from the screen/ If not the unique
	 * insert a red text row to the form
	 */
	EventsAutorization(e: MouseEvent | KeyboardEvent) {
		if (((e as MouseEvent).target as HTMLButtonElement).type === "submit"
			|| ((e as KeyboardEvent).key === 'Enter')) {
			// e.preventDefault();

			const formAuthorisation = (body[0].querySelector('.author') as HTMLElement);
			/* remove a form uathorization */

			let userNetwork: any; // It's one a new User
			const req = new fetchRequest();
			if (inputValue.length == 0) { return }
			req.makePostRequest({ login: inputValue })
				.then((result: any) => {
					if (!result.ok) return
					return result.json();
				})
				.then((result: any): boolean => {
					const pesponse = Object.values(result)[0] === 'Ok' ? true : false
					if (pesponse === true) {
						userNetwork = new UsersNetwork(inputValue);
						userNetwork.addId = Object.values(result)[1]
					}

					return pesponse
				})
				.then((resp: boolean) => {
					const newLogin = document.querySelector('.login');
					if (!resp) {
						newLogin?.insertAdjacentHTML('beforeend', '<p style="color:red">Полуьзователь уже сузществует</p>');
						return
					}
					/* This's the Input forms from the mmain page- start */
					formAuthorisation.setAttribute('style', 'display:none;');
					(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).removeAttribute('style');
					/* This's the Input forms - finished */


					let personList = userNetwork.participantsAdd = boxAccaunts;
					const perArr = personList[0].querySelectorAll('.accaunt__online_one');
					userNetwork.personСss = perArr[perArr.length - 1];
					userNetwork.personСss
					inputValue = '';
					return
				});


		}
		return
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
					<button id="go" type="submit">Предложить</button>
				</div>
			</form>
		</div>
	</section>`
	}
}
/* -----FORM Input from new Login----- Finish*/

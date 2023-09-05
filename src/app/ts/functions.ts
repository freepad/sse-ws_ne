const { UsersNetwork } = require("./chating/users.ts");
let { fetchRequest } = require("./fech-request");
const { checkLoginValidate } = require("./validators");

/* -----FORM a checkins new Login.  ----- Start*/
let inputValue: string = '';
let inputForChating: any = null;
/*** This's a handlers for the Events */
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
const exictingUsers = document.querySelectorAll('.accaunts');

export const handlers = {
	/**
	 *
	 * @param elem: It's DOM-Element for uploading every the user  identification's data into the chat.
	 * This's event occurs to the page load.
	*/

	EventUsersLoads() {
		const req = new fetchRequest();

		req.makeGetRequest()
			.then((result: any) => { return result.json() })
			.then((result: any) => {
				(Object.values(result)[0] as any).forEach((item: any) => {
					/**
					 * Loading on a page all the Logins from the db    begining*/
					const persons = new UsersNetwork(item['login']);
					persons.addId = item['ind'];
					exictingUsers[exictingUsers.length - 1].insertAdjacentElement('beforeend', persons.addAllUser);
					/* * Loading on a page all the Logins from the db    finished*/
				});

			});
	},

	/**
	 * Identification for a new User.
	 * This's function geting to the entrance the Event:MouseEvent
	 * @param e : It's an Event by the buttom from a form for indetifacation/.
	 * @param inputValue: It's a value from the input field.
	 * @returns The void. Only can see in the browser this form/ If 'inputValue' is unique so forms removing from the screen/ If not the unique
	 * insert a red text below row to the form.
	 */
	EventsAutorization(e: MouseEvent | KeyboardEvent) {
		if (((e as MouseEvent).target as HTMLButtonElement).type === "submit"
			|| ((e as KeyboardEvent).key === 'Enter')) {
			e.preventDefault();

			/* remove a form uathorization */
			const req = new fetchRequest();
			if (inputValue.length == 0) { return }
			identificationNewUser(req);
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

	/**
	 * For a "eventSource.addEventListener('message')" from the 'main.ts'
	 * @param e: The Event.
	 */
	eventSourceMessage(e: any) {
		// debugger;

		const { ...datas } = JSON.parse(e.data);
		// debugger;
		console.log('Message from EventSource: ', datas);
		let newPerson = new UsersNetwork(datas.login);
		/**
		 * Code below assign a new proporties, for a new object/user
		 * Start proporties.
		 */

		newPerson.addId = datas.ind; // Сохранить ID в LocalStorage
		newPerson.onOrOfLine = true;
		newPerson.addPropertiesUser;
		/** The end proporties */

		const chattalks = document.querySelector('.accaunts') as HTMLElement;
		console.log('test 01')
		chattalks.insertAdjacentElement('beforeend', newPerson.addOneUser);

		/**
		 * This's the field from the chatingform. It's for the message publication
		 * Opening the event listener - start
		 */
		inputForChating = document.querySelector('.chattalks input') as HTMLElement;
		inputForChating.addEventListener('keypress', eventPublicMessage);

		const login = newPerson.addPropertiesUser.login;
		function eventPublicMessage(e: KeyboardEvent) {
			if (e.key === 'Enter') {
				const data = (e.target as HTMLInputElement).value as string;


				const boxForMessages = document.querySelector('.chattalks > div:first-of-type') as HTMLElement;

				boxForMessages.insertAdjacentHTML('beforeend', handlers.posts(data, login));
				debugger;
				(e.target as HTMLInputElement).value = '';

			}
		}
		// Opening the event listener - finished
	},
	posts(message: string, user: string): string {
		return `<div class="post">
					<div class="post-accaunt sourcename">${user}</div>
					<div class="date">23:04 20.03.2019</div>
					<div class="text">${message}</div>
				</div`
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


/**
 * It's for a EventsAutorization handler.
 * @param req: it's object from a 'fetch-request'
 * @returns returning the options for a async/await fetch request.
 */
function identificationNewUser(req: any) {
	return req.makePostRequest({ login: inputValue })
		.then((result: any) => {
			if (!result.ok) return
			return result.json();
		})
		.then((result: any): boolean => {
			const pesponse = Object.values(result)[0] === 'Ok' ? true : false;
			const myLogin = document.querySelector(`div[data-num="${result.ind}"]`);
			myLogin?.classList.add('you');
			return pesponse
		})
		.then((resp: boolean) => {
			/**
			 * @param 'resp': it's saving respons from the checker a new login's name.
			 * If 'resp' is a 'true' so form (for identification) removing.
			 * */
			const formAuthorisation = (body[0].querySelector('.author') as HTMLElement);
			if (!resp) {
				formAuthorisation?.insertAdjacentHTML('beforeend', '<p style="color:red">Полуьзователь уже существует</p>');
				return
			}

			/* This's the Input forms (for chatting is  below on page ) from the mmain.ts page- start */
			formAuthorisation.setAttribute('style', 'display:none;');
			(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).removeAttribute('style');
			/* This's the Input forms - finished */


			inputValue = '';
			return
		});
}
/**
 * It's only a font's visual style  from the foms authorization
 */
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

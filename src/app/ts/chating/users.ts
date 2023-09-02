const { fetchRequest } = require('../fech-request');

class Users {
	login: string;
	#ind: string;
	constructor(newLogin: string) {
		this.login = newLogin;
		this.#ind = '';
	}
	set addId(ind: string) {
		this.#ind = ind;
	}
	get addId() { return this.#ind }

	set participantsAdd(elem: HTMLElement[]) {
		elem[elem.length - 1].insertAdjacentHTML('beforeend', this.templates());
	}



	private templates() {
		return `<div class="accaunt__online_one">
				<div class="preview">
					<!-- <img src="/" /> -->
				</div>
				<div class="sourcename">
					<span>${this.login}</span>
				</div>
			</div>`
	}
}

class UsersStyle extends Users {
	userBoxHtml: any;
	status: boolean;

	constructor(newLogin: string) {
		super(newLogin)
		this.userBoxHtml = null;
		this.status = false;
	}
	set personСss(elem: HTMLElement) {
		console.log('ELEM_CSS:', elem)
		this.userBoxHtml = elem;
	}
	get personСss(): void {
		this.userBoxHtml.classList.add('you');
		console.log('ELEM_Clacc:', this.userBoxHtml.classList)
		return
	}


}

export class UsersNetwork extends UsersStyle {
	// person: any;
	// status: boolean;
	constructor(newLogin: string) {
		super(newLogin)
		// this.person = '';
		// this.status = false;
	}

	set onOrOfLine(elem: boolean) {
		if (elem) {
			this.status = true;
			this.#sendPersonDB();
		}
	}
	get onOrOfLine() { return this.status }

	#sendPersonDB() {
		const req = new fetchRequest();
		req.makePostRequest(this);
	}

	set loadPersons(elem: HTMLElement) {
		/**объект отправить в БД  */
	}
}

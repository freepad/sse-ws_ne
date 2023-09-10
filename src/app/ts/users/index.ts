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
}

class UsersHtml extends Users {
	status: boolean;
	#templateHtml: HTMLElement;

	constructor(newLogin: string) {
		super(newLogin)
		this.status = false;
		this.#templateHtml = document.createElement('div') as HTMLElement;
	}

	private crateUserHtml() {

		const div: HTMLElement = this.#templateHtml;
		const divImg = div.cloneNode(true);
		(divImg as HTMLElement).className = 'preview';
		const divLogin = div.cloneNode(true);
		(divLogin as HTMLElement).setAttribute('data-num', this.addId);

		const img = document.createElement('img');
		img.src = '/';
		divImg.appendChild(img);

		const span = document.createElement('span');
		span.innerHTML = this.login;

		(divLogin as HTMLElement).className = "sourcename";
		(divLogin as HTMLElement).appendChild(span);

		div.appendChild(divImg);
		div.appendChild(divLogin);

		(div as HTMLElement).className = `accaunt__online_one`;

		this.#templateHtml = div as HTMLElement;
		// debugger
		// return this.templateHtml;
	}

	/* get addAllUser() {
		this.crateUserHtml();
		return this.templateHtml
	 }*/

	get addUser() {
		this.crateUserHtml();
		return this.#templateHtml
	}

}

export class UsersNetwork extends UsersHtml {
	network: 'online' | 'ofline';
	constructor(newLogin: string) {
		super(newLogin)
		this.network = 'ofline';
	}

	/**
	 * @params status: if it's a 'true' means login is a unique and user has been status a online;
	 */
	set onOrOfLine(status: boolean) {
		if (status) this.network = 'online';
	}

	get onOrOfLine(): string { return this.network }

	get addPropertiesUser() {
		return {
			login: this.login,
			ind: this.addId,
			network: this.onOrOfLine,
		}

	}

}

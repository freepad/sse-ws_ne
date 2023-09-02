
class Users {
	login: string;
	ind: string;
	constructor(newLogin: string) {
		this.login = newLogin;
		this.ind = '';
	}
	set addId(ind: string) {
		this.ind = ind;
	}

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

export class Persons extends Users {
	person: any;
	status: boolean;
	constructor(newLogin: string) {
		super(newLogin)
		this.person = '';
		this.status = false;
	}
	set personСss(elem: HTMLElement) {
		this.person = elem;
	}
	get personСss(): void {
		this.person.classList.add('you');
		return
	}

	set onOrOfLine(elem: boolean) {
		if (elem) { this.status = true }
	}

	set loadPersons(elem: HTMLElement) {

	}
}

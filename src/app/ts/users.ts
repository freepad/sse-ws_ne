class Users {
	newLogin: string;

	constructor(newLogin: string) {
		this.newLogin = newLogin;
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
					<span>${this.newLogin}</span>
				</div>
			</div>`
	}
}

export class Persons extends Users {
	person: any;
	constructor(newLogin: string) {
		super(newLogin)
		this.person = '';
	}
	set personСss(elem: HTMLElement) {
		this.person = elem;
	}
	get personСss(): void {
		this.person.classList.add('you');
		return
	}

	set loadPersons(elem: HTMLElement) {

	}
}
